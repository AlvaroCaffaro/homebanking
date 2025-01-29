import { Account } from "../LOGIC/object/account";
import { Person } from "../logic/object/user";
import { Information } from "../logic/dependenciesAuth"
export class userController{


    public async get_personalInformation(req:any,res:any){

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
                "secondname":person.get_secondName(),
                "lastname": person.get_secondName()  
            },
            result:'success',
            message: ''
                  
        });

    }

    public async get_personalAccounts(req:any,res:any){
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
                'holder_id': a.get_holder_id(),
                'holder_dni': a.get_dni(),
                'balance':a.get_balance(),
                'currency':{
                    'id':c.get_id(),
                    'name':c.get_name(),
                    'code':c.get_code()
                }

            });
        }

        res.json({
            data: data,
            result: 'success',
            message: ''
        });
        
    }
}