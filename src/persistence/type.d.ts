import { Account } from "../LOGIC/object/account"



export type transferCreation = {
    deliver_account:Account | null,
    remmiter_accountId: bigint,
    amount_remmiter:number,
    amount_deliver:number,
    currency_code:string
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

export type accountQuery = {
    id:bigint,
    number:string,
    holder_id:string,
    holder_dni:string,
    alias: string,
    currency_id:bigint,
    currency_code:string,
    currency_name:string,
    balance:number,
    state:string
}