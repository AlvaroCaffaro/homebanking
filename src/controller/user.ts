
import { EnvCofig } from "../env.config";
import { Information } from "../logic/dependenciesUser";
import jwt from 'jsonwebtoken';
import { FormValidator } from "../validation/formValidation";

export class UserController{


    static async get_personalInformation(req:any,res:any){
        const {id} = req.session.user;

        const person = await Information.get_personalInfromation({id:id});
        
        if(person instanceof Error){
            return res.json({
                message:person.message,
                result: 'failure',
                data:null
            });
        }


        return res.json({
            data: {
                "dni": person.get_dni(),
                "name": person.get_name(),
                "secondname":person.get_secondname(),
                "lastname": person.get_lastname()  
            },
            result:'success',
            message: ''
                  
        });

    }

    static async get_userInformation(req:any,res:any){

        const {name,email} = req.session.user;
        return res.json({
            data:{
                username:name,
                email:email
            },
            result:'success',
            message:''
        });
    }

    static async get_personalAccounts(req:any,res:any){
        
        const {id} = req.session.user;
        const account = await Information.get_accounts({id:id});

        if(account instanceof Error){
            return res.json({
                data: null,
                result: 'failure',
                message: [account.message],
            });
        }

        let data = [];
        let c;
        let token;
        for(const a of account){

            if(a.get_state() == 'accepted'){ 
                token = jwt.sign({ 
                    number:a.get_number(),
                    alias:a.get_alias(),
                    currency:{
                        id:a.get_currency().get_id(),
                        code:a.get_currency().get_code(),
                        name:a.get_currency().get_name()
                    }
                    
                },
                    EnvCofig.other_secret,
                    {
                    expiresIn:60*60*60*2 // 2 hours
                }
                );
            } else { token = 'the account it not accepted,'}

            
            c = a.get_currency();
            data.push({
                'id':a.get_id(),
                'number':a.get_number(),
                'balance':a.get_balance(),
                'currency':{
                    'id':c.get_id(),
                    'name':c.get_name(),
                    'code':c.get_code()
                },
                'state': a.get_state(),
                'token': token
            });
        }

        return res.json({
            data: data,
            result: 'success',
            message: []
        });
        
    }

    static async get_currencies(req:any,res:any){

        const result = await Information.get_currencies();

        if(result instanceof Error){
            return res.json({
                data: null,
                result: 'failure',
                message: [result.message]
            });
        }

        let data = [];
        for(const c of result){
            data.push({
                id: c.get_id(),
                name:c.get_name(),
                code:c.get_code()
            });
        }

        return res.json({
            data: data,
            result: 'success',
            message: []
        });
    } 

    static async create_account(req:any,res:any){
        const {id} = req.session.user;
        const {currencyId} = req.body; 

        const result:any = await Information.create_account({
            holderId: id,
            currencyId:currencyId
        });

        if(result instanceof Error){
            return res.json({
                data: null,
                result: 'failure',
                message: [result.message]
            });
        }

        return res.json({
            data: null,
            result: 'success',
            message: ['la cuenta ha sido solicitada. En el transcurso de los dias será aprobada.']
        });
    }

    static async update_password(req:any,res:any){
        const {id} = req.session.user;
        const {newPassword} = req.body;

        const message = FormValidator.isValidPassword({value:newPassword});
        if(!message){
            return(res.json({
                status:'failure',
                message:[message],
                data:null
            }));
        }
        const result = await Information.update_password({id:id,new_password:newPassword});

        if(result instanceof Error){
            return res.json({
                data: null,
                result: 'failure',
                message: [result.message]
            });
        }

        return res.json({
            data: null,
            result: 'success',
            message: ['la contraseña ha sido cambiada con éxito']
        });
    }

    static async update_username(req:any,res:any){
        const {id} = req.session.user;
        const {newUsername} = req.body;

        const message = FormValidator.isValidName({value:newUsername});
        if(!message){
            return(res.json({
                status:'failure',
                message:[message],
                data:null
            }));
        }

        const result = await Information.update_username({id:id,new_username:newUsername});

        if(result instanceof Error){
            return res.json({
                data: null,
                result: 'failure',
                message: [result.message]
            });
        }

        return res.json({
            data: null,
            result: 'success',
            message: ['El nombre de usuario fue cambiado correctamente']
        });
    }

}