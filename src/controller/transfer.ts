import { transferCreator } from "../logic/dependenciesAccount";
import { Account } from "../LOGIC/object/account";

export class TransferController{
 
        

    static async find_account(req:any,res:any){
    
        const {identifier} = req.body;

        const result = await transferCreator.findAccount({identifier:identifier});

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
    
        const {id,currency} = req.session.account;
        const {destinationId,destinationCurrencyId,destinationCurrencyCode,amount} = req.body;

        const result = await transferCreator.create({
            destination_id:destinationId,
            destination_currencyId:destinationCurrencyId,
            destination_currencyCode:destinationCurrencyCode,
            remitter_id:id,
            remitter_currencyId:currency.id,
            remitter_currencyCode:currency.code,
            remitter_amount:amount
        }); 

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