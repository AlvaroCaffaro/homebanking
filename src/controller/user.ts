
import { Information } from "../logic/dependenciesUser"

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
        const account = await Information.get_accounts(req.session.id);

        if(account instanceof Error){
            return res.json({
                data: null,
                result: 'failure',
                message: account.message,
            });
        }


        let data = [];
        let c;
        for(const a of account){
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
                'state': a.get_state()

            });
        }

        res.json({
            data: data,
            result: 'success',
            message: ''
        });
        
    }
}