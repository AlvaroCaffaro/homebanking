import jwt from "jsonwebtoken";
import { accountManager } from "../logic/dependenciesAccount";
import { Datetime } from "../utils/date";
import { AccountValidation } from "../validation/accountValidation";
import { EnvCofig } from "../env.config";


export class AccountController{
    
    static async get_transfers(req:any,res:any){
        
        const {account} = req.session;
        const {from,to} = req.body;

        const fromDate = new Datetime(from);
        const toDate = new Datetime(to);

        let message = AccountValidation.isValidDate({value:fromDate});
        if(message != null){
            return res.json({
                status:'failure',
                message: [message],
                data:null
            });
        }

        message = AccountValidation.isValidDate({value:toDate});
        if(message != null){
            return res.json({
                status:'failure',
                message: [message],
                data:null
            });
        }

        if(!fromDate.older(toDate)){
            return res.json({
                status:'failure',
                message:['Rango incorrecto. La fecha de inicio debe ser mas antigua que la fecha de fin'],
                data:null
            });
        }
    
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
        });

    }

    static async get_lastTransfers(req:any,res:any){
        const {id} = req.session.account;

        const result = await accountManager.getLastOperations({idAccount:id});
        
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
        });

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

        const {number,currency} = req.session.account;

        const token = jwt.sign({
            id:id,
            number:number,
            alias:newAlias,
            currency:currency
        }, EnvCofig.other_secret,{
            expiresIn:60*60*60*2
        });

        return res.json({
            status:'success',
            message:'se ha actualizado correctamente el alias.',
            data:null,
            token:token
        });
    }

}