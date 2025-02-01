
import { EnvCofig } from "../env.config";
import { Information } from "../logic/dependenciesUser";
import jwt from 'jsonwebtoken';

export class UserController{


    static async get_personalInformation(req:any,res:any){

        const person = await Information.get_personalInfromation(req.session.id);
        
        if(person instanceof Error){
            return res.json({
                message:person.message,
                result: 'failure',
                data:null
            })
        }


        res.json({
            data: {
                "dni": person.get_dni(),
                "name": person.get_name(),
                "secondname":person.get_secondname(),
                "lastname": person.get_secondname()  
            },
            result:'success',
            message: ''
                  
        });

    }

    static async get_userInformation(req:any,res:any){
        res.json({
            data:{
                username:req.session.name,
                email:req.session.email
            },
            result:'success',
            message:''
        });
    }

    static async get_personalAccounts(req:any,res:any){
        const account = await Information.get_accounts(req.session.user.id);

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

            token = jwt.sign({ 
                    id:a.get_id(),
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
                    expiresIn:60*60*60*24*10 // 10 days
                }
            );
            

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

        res.json({
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
            res.json({
                data: null,
                result: 'failure',
                message: [result.message]
            });
        }

        res.json({
            data: null,
            result: 'success',
            message: ['la cuenta ha sido solicitada. En el transcurso de los dias será aprobada.']
        });
    }
}