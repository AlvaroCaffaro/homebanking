import { EnvCofig } from "../env.config";
import { accountManager } from "../logic/dependenciesAccount";
import { PersonalAccount } from "../LOGIC/object/account";
import { Datetime } from "../utils/date";
import { AccountValidation } from "../validation/accountValidation";
import { TransferValidation } from "../validation/transferValidation";


export class AccountController{
    
    static async get_transfers(req:any,res:any){
        
        const {account} = req.session;
        const {from,to} = req.body;

        let message = AccountValidation.isValidDate(from);
        if(message != null){
            return res.json({
                status:'failure',
                message: [message],
                data:null
            });
        }

        message = AccountValidation.isValidDate(to);
        if(message != null){
            return res.json({
                status:'failure',
                message: [message],
                data:null
            });
        }

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
                date:el.get_date().toLocalFullString(),
                other_person:el.get_otherPerson(),
                other_AccountNumber:el.get_otherAccountNumber(),
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

    static async get_info(req:any,res:any){
        const {id,number,alias,currency} = req.session.account;

        const result = await accountManager.getBalance({idAccount:id});

        if(result instanceof Error){
            return res.json({
                status: 'failure',
                message:[result.message],
                data:null
            });
        }

        return res.json({
            status:'success',
            message:'',
            data:{
                number:number,
                alias:alias,
                currency:currency,
                balance:result.balance,
            }
        });
        
    }


    static async update_alias(req:any,res:any){
        const {id} = req.session.account;
        const {newAlias} = req.body;


        const message = AccountValidation.isValidAlias({value:newAlias});
       
        if(message != null){
            return res.json({
                message:[message],
                status:'failure',
                data:null
            });
        }

        const result = await accountManager.updateAlias({idAccount:id,newAlias:newAlias});

        if(result instanceof Error){
            return res.json({
                status: 'failure',
                message:[result.message],
                data:null
            });
        }

        return res.json({
            status:'success',
            message:'se ha actualizado correctamente el alias.',
            data:null
        });
    }

}