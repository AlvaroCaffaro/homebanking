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