import { accountQuery, personalAccountQuery, personQuery } from "../../persistence/type";
import { Currency } from "./currency";
import { Person } from "./user";


export class PersonalAccount{

    private id:bigint;
    private number:string;
    private alias:string;
    private currency:Currency
    private balance:bigint;
    private state:string;


    constructor(account:personalAccountQuery){
        this.id = account.id;
        this.number = account.number;
        this.alias = account.alias;
        this.balance = account.balance;
        this.currency = new Currency({id:account.currency_id,name:account.currency_name,code:account.currency_code});
        this.state = account.state;
    }

    public get_id(){
        return this.id;
    }


    public get_number(){
        return this.number;
    }

    public get_alias(){
        return this.alias;
    }


    public get_currency(){
        return this.currency;       
    }


    public get_balance(){
        return this.balance;
    }

    public get_state() {
        return this.state;
    }




}



export class Account {
    
    private id:bigint;
    private number: string;
    private alias:string;
    private holder:Person
    private currency:Currency;

    constructor(account:accountQuery) {
        this.id = account.id;
        this.number = account.number;
        this.alias = account.alias;

        this.holder = new Person({
            id:account.holder_id,  // this, in fact, is the holder id, its not the person id 
            dni:account.holder_dni,
            name:account.holder_name,
            secondname:account.holder_secondname,
            lastname:account.holder_lastname

        });

        this.currency = new Currency({
            id:account.currency_id,
            code:account.currency_code,
            name:account.currency_name
        });
    }

    public get_id(){
        return this.id;
    }

    public get_holder_id(){
        return this.holder.get_id();
    }

    public get_dni(){
        return this.holder.get_dni();
    }
    
    public get_holder_fullname(){
    
        return this.holder.get_fullname();
    }

    public get_number(){
        return this.number;
    }

    public get_alias(){
        return this.alias;
    }
   

    public get_currency(){
        return this.currency;       
    }



}



export const map_account = (data:accountQuery[]) =>{
    return data.map((el:accountQuery)=> new Account(el));
}


export const map_personalAccount = (data:personalAccountQuery[]) =>{
    return data.map((el:personalAccountQuery)=> new PersonalAccount(el));
}