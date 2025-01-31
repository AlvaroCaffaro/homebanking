
import { transferQuery } from "../../persistence/type";
import { Datetime } from "../../utils/date";
import { Currency } from "./currency";


export class Transfer {

    private id:bigint;
    private code:string;
    private date:Datetime;
    private amount:number;
    private currency:Currency;
    private destintation_account:bigint;
    private remitter_account:bigint;
    private type:string;

    constructor(operation:transferQuery){

        this.id = operation.id;
        this.code = operation.code;
        this.date = operation.date_t;
        this.amount = operation.amount;
        this.currency =  new Currency({id:operation.currency_id, name:operation.currency_name, code:operation.currency_code});
        this.destintation_account = operation.destination_account;
        this.remitter_account = operation.remitter_account;
        this.type = operation.type_t;

    }

    
    public get_id(){
        return this.id;
    }

    public get_code(){
        return this.code;
    }

    public get_date(){
        return this.date;
    }

    public get_amount(){
        return(this.amount);
    }

    public get_currency(){
        return(this.currency.get_code());
    }

    public get_type():any {
        return this.type;
    }


   public get_remitterAccount(){
        return this.remitter_account;
   }
    
}





export const map_transfer =(data:transferQuery[])=>{
    data.map((el:any)=> ( new Transfer(el)));
}