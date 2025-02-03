import { Account } from "../LOGIC/object/account"
import { Datetime } from "../utils/date";


export type accountShortData = {
    account_id:string ,
    currency_id:string ,
    currency_code:string ,
};

export type transferCreation = {
    destination_account:accountShortData,
    remitter_account: accountShortData ,
    remitter_amount:number,
    destination_amount:number,
}


export type personCreation = {
    dni:string,
    name:string,
    secondname:string|null,
    lastname:string
    
}

export type holderCreation = {
    username:string,
    password:string,
    email:string,
    person:personCreation  
}

export type accountCreation = {
    currencyId:bigint,
    holderId: bigint,   
}


export type personQuery = {
    id:string,
    dni:string,
    name:string,
    secondname:string,
    lastname:string
}

export type userQuery = {
    id:string,
    username:string,
    hashed_password:string,
    email:string,
    person_id:string, 
    dni:string,
    name:string,
    secondname:string,
    lastname:string
}

export type personalAccountQuery = {
    id:bigint,
    number:uuid,
    alias:string,
    currency_id:bigint,
    currency_code:string,
    currency_name:string,
    balance:bigint,
    state:string
}


export type accountQuery = {
    id:bigint,
    number:string,
    holder_id:string,
    holder_dni:string,
    holder_name:string,
    holder_secondname:string,
    holder_lastname:string,
    alias:string,
    currency_id:bigint,
    currency_code:string,
    currency_name:string
}

export type transferQuery ={
    id:bigint,
    code:string,
    date_t:Datetime,
    destination_account:bigint,
    remitter_account:bigint,
    currency_id:bigint,
    currency_code:string,
    currency_name:string,
    amount:number,
    type_t:string
}