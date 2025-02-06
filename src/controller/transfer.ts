import { transferCreator } from "../logic/dependenciesAccount";
import { Account } from "../LOGIC/object/account";

export class TransferController{

    static async get_PersonsAgenda(req:any,res:any){
        
        const {id} = req.session.account;
        const agenda = await transferCreator.getPersonsAgenda({idAccount:id});
        
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
                message:[],
                data: data
        });
    }


    static async get_personAccounts(req:any,res:any){
        const {idPerson} = req.body;

        const result = await transferCreator.getPersonAccount({idPerson:idPerson});
        if(result instanceof Error){
            return res.json({
                status:'failure',
                message:[result.message],
                data:null
            });
        }


     
        
        let data = [];
        let c;
        for(const el of result){
            c = el.get_currency();
            data.push({
                id:el.get_id(),
                number:el.get_number(),
                alias:el.get_alias(),
                holder:{ 
                    id:el.get_holder_id(),
                    dni:el.get_dni(),
                    fullname:el.get_holder_fullname(),
                   
                },
                currency:{
                    id: c.get_id(),
                    code:c.get_code(),
                    name:c.get_name()
                },
            });
        }


        return res.json({
            data:data,
            status:'success',
            message:[]
        });

    }
        

    static async find_account(req:any,res:any){
    
        const {identifier} = req.body;

        const result = await transferCreator.findAccount({identifier:identifier});

        if(result instanceof Error){
            return res.json({
                message:[result.message],
                status:'failure',
                data:null
            });
        }

        const c = result.get_currency();

        return res.json({
            message:[],
            status:'success',
            date:{
                id:result.get_id(),
                number:result.get_number(),
                alias:result.get_alias(),
                currency:{
                    id:c.get_id(),
                    name:c.get_name(),
                    code:c.get_code()
                },
                holder:{
                    id:result.get_holder_id(),
                    dni:result.get_dni(),
                    fullname:result.get_holder_fullname(),    
                }
            }
        });
           
    
    }
    
    
    
 
   static async create(req:any,res:any){
    
        const {id,currency} = req.session.account;
        const {destinationId,destinationCurrencyId,destinationCurrencyCode,amount} = req.body;

        const result = await transferCreator.create({
            destination_id:(destinationId),
            destination_currencyId:(destinationCurrencyId),
            destination_currencyCode:destinationCurrencyCode,
            remitter_id:(id),
            remitter_currencyId:(currency.id),
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



        return res.json({
            status:'success',
            message:[],
            data:result
        });
        
    
    }

    

            
}