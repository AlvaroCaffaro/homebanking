
import { account, operation, transaction, transfer, typeTransaction, typeTransfer } from "../type";
import { Account } from "./account";
import { Currency } from "./currency";

abstract class Operation{
    private id:bigint;
    private code:string;
    private date:Date;
    private amount:number;
    private currency:Currency;

    constructor(operation:operation){
        this.id = operation.id;
        this.code = operation.code;
        this.date = operation.date;
        this.amount = operation.amount;
        this.currency =  new Currency(operation.currency);
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

    public abstract get_type():any;
    
}


export class Transaction extends Operation{

    private account_id:bigint;
    private type:typeTransaction;

    constructor(operation:transaction){
        super({
            id:operation.id,
            code:operation.code,
            date: operation.date,
            amount: operation.amount,
            currency:operation.currency
        })
        this.account_id = operation.account_id;
        this.type = operation.type;

    }

    public get_type() {
        return this.type;
    }


    
}


export class Transfer extends Operation{

   
    private destintattion_account:bigint;
    private remmiter_account:Account;
    private type:typeTransfer;

    constructor(operation:transfer){
        super({
            id:operation.id,
            code:operation.code,
            date: operation.date,
            amount: operation.amount,
            currency:operation.currency
        })

        this.destintattion_account = operation.destintattion_account;
        this.remmiter_account = new Account(operation.remmiter_account);
        this.type = operation.type;

    }


   public get_type() {
       return this.type;
   }

   public get_remitterAccount(){
        return this.remmiter_account;
   }


    
}





export const map_transaction =(data:any[])=>{
    data.map((e:any)=> ((e.remmiter_account == null)? new Transfer(e): new Transaction(e)));
}