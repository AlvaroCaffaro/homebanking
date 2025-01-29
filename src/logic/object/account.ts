import { accountQuery } from "../../persistence/type";
import { account } from "../type";
import { Currency } from "./currency";

export class Account {
    
    private id:bigint;
    private number: string;
    private holder_id:string;
    private holder_dni: string;
    private currency:Currency;
    private balance:number;

    constructor(account:accountQuery) {
        this.id = account.id;
        this.number = account.number;
        this.holder_id = account.holder_id;
        this.holder_dni = account.holder_dni;
        this.currency = new Currency({
            id:account.currency_id,
            code:account.currency_code,
            name:account.currency_name
        });
        this.balance = 0;
    }

    public get_id(){
        return this.id;
    }

    public get_holder_id(){
        return this.holder_id;
    }

    public get_number(){
        return this.number;
    }

    public get_dni(){
        return this.holder_dni;
    }

    public get_currency(){
        return this.currency;       
    }


    public get_balance(){
        return this.balance;
    }

}



export const map_account = (data:accountQuery[]) =>{
    data.map((e:accountQuery)=> new Account(e));
}