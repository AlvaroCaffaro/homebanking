
import { transferQuery } from "../../persistence/type";
import { Datetime } from "../../utils/date";
import { Currency } from "./currency";


export class Transfer {

    private id:bigint;
    private code:string;
    private date:Datetime;
    private amount:number;
    private currency:Currency;
    private other_person:{  
        // Esta es la informacion de la otra persona que participo en la transferencia que no es el usuario actual,
        // si el usuario recibio una transferencia other person tiene el dni y el nombre completo de la persona que envio la transferencia.
        fullname:string,
        dni:string
    }
    private other_accountNumber:string;
    private type:string;

    constructor(operation:transferQuery){

        this.id = operation.id;
        this.code = operation.code;
        this.date = new Datetime(operation.date_t);
        this.amount = operation.amount;
        this.currency =  new Currency({id:operation.currency_id, name:operation.currency_name, code:operation.currency_code});
        this.other_person = {
            fullname:operation.other_person_fullname,
            dni:operation.other_person_dni
        };
        this.other_accountNumber = operation.other_account_number;
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
        return(this.currency);
    }

    public get_otherPerson(){
        return(this.other_person);
    }

    public get_otherAccountNumber(){
        return(this.other_accountNumber);
    }

    public get_type():any {
        return this.type;
    }

    
}





export const map_transfer =(data:transferQuery[])=>{
    return data.map((el:any)=> ( new Transfer(el)));

}