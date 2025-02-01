import { transferCreator } from "../logic/dependenciesAccount";
import { Account } from "../LOGIC/object/account";

export class TransferController{
 
        
        static async set_destination(req:any,res:any){
    
        const {identifier} = req.body;

        const result:Account | Error = await transferCreator.set_destination({identifier:identifier}) as Account;

        if(result instanceof Error){
            return res.json({
                message: result.message,
                status:'failure',
                data:null
            });
        }

        transferCreator.set_remitter({
            remitter_accountId:req.session.account.id,
            remitter_currencyId:req.session.account.currency.id,
            remitter_currencyCode:req.session.account.currency.code,
        });

        res.json({
            message:'',
            status:'success',
            data:{
                id:result.get_id(),
                number:result.get_number(),
                holder:{
                    id:result.get_holder_id(),
                    fullname:result.get_holder_fullname(),
                    dni:result.get_dni(),
                },

                alias:result.get_alias(),
                currency:{
                    id:result.get_currency().get_id(),
                    code:result.get_currency().get_code(),
                    name:result.get_currency().get_name()
                }
                
            }
        });
            
    }
    
    
   static async set_amount(req:any,res:any){
    
        const {amount} = req.body;

        const result = await transferCreator.set_amount(amount);

        if(result instanceof Error){
            res.json({
                message:[res.message],
                status:'failure',
                data:null
            });
        }

        res.json({
            message:[],
            status:'success',
            date:null
        });
           
    
    }
    
    
   static async create(req:any,res:any){
    
        const result = await transferCreator.create();            
        if(result instanceof Error){
           return res.json({
                message:[result.message],
                status:'failure',
                data:null
            });
        }

        res.json({
            status:'success',
            message:[],
            data:result
        })
        
    
    }

            
}