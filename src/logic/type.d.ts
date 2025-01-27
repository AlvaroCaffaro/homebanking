import { Currency } from "./object/currency";

export type typeTransaction = 'deposit' | 'extract';
export type typeTransfer = 'recived' | 'sent';


export type person = {
    id:string,
    dni:string,
    name:string,
    secondName:string|null,
    lastname:string
    
}

export type holder = {
    id:string,
    username:string,
    email:string,
    person:person
}

export type currency = {
    id:bigint,
    name:string,
    code:string
}

export interface operation {
    id:bigint,
    code:string,
    date:Date,
    amount:number,
    currency:currency
}

export interface transaction extends operation{
    type:typeTransaction,
    account_id:bigint,
    remmiter_account:null,
}

export interface transfer extends operation{
    destintattion_account:bigint,
    remmiter_account:account,
    type:typeTransfer
}

export type account = {
    id:bigint,
    number: string,
    dni: string,
    currency:currency,
    balance:number
}

