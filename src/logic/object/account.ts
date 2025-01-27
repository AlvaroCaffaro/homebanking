import { account } from "../type";
import { Currency } from "./currency";

export class Account {
    
    private id:bigint;
    private number: string;
    private dniHolder: string;
    private currency:Currency;
    private balance:number;

    constructor(account:account) {
        this.id = account.id;
        this.number = account.number;
        this.dniHolder = account.dni;
        this.currency = new Currency(account.currency);
        this.balance = 0;
    }

    public get_id(){
        return this.id;
    }

    public get_number(){
        return this.number;
    }

    public get_dni(){
        return this.dniHolder;
    }

    public get_currency_code(){
        return this.currency.get_code();
    }

    public get_balance(){
        return this.balance;
    }

}



export const map_account =(data:any[])=>{
    data.map((e:account)=> new Account(e));
}