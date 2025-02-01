import { EnvCofig } from "../env.config";
import { accountManager } from "../logic/dependenciesAccount";
import { Datetime } from "../utils/date";


export class AccountController{
    
    static async get_transfers(req:any,res:any){
        
        const {account} = req.session;
        const {from,to} = req.body;

        console.log(from);
        const fromDate = new Datetime(from);
        const toDate = new Datetime(to);

        const result = await accountManager.getOperations({idAccount:account.id,from:fromDate,to:toDate});

        if(result instanceof Error){
            return res.json({
                status:'failure',
                message:[result.message],
                data: null
            });
        }

        let data = [];
        for(const el of result){
            data.push({
                id:el.get_id(),
                code:el.get_code(),
                date:el.get_date().toString(),
                remitter:el.get_remitterAccount(),
                amount:el.get_amount(),
                currency_code:el.get_currency(),
                type:el.get_type()
            });
        }

        res.json({
            status:'success',
            message:'',
            data:data

        }
        )

    }

    static async get_accountAgenda(req:any,res:any){
        
        const {id} = req.session.account;
        const agenda = await accountManager.getAccountAgenda({idAccount:id});
        
        if(agenda instanceof Error){
            return res.json({
                status:'failure',
                message:[agenda.message],
                data: null
            });
        }

        let data = [];

        for (const el of agenda){
            data.push({
                id: el.get_id(),
                dni:el.get_dni(),
                fullname:el.get_fullname()
            });
        }

        return res.json({
                status:'success',
                message:'',
                data: data
        });
    }


    static async get_agenda(req:any,res:any){
        try{
//            const agenda = await accountManager.getAccountsAgenda();

        } catch(e){
            return e;
        }
    }




    

}