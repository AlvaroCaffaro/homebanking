import { Account } from "../LOGIC/object/account"



export type transferCreation = {
    remmiter_account: Account, // this could be the account's number or alias
    deliver_accountId:bigint,
    amount:number,
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