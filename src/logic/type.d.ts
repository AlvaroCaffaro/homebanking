import { personQuery } from "../persistence/type";

export type typeTransaction = 'deposit' | 'extract';
export type typeTransfer = 'recived' | 'sent';




export type holder = {
    id:string,
    username:string,
    email:string,
    person:personQuery
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
    number:string,
    holder_id:string,
    holder_dni:string,
    alias: string,
    currency_id:bigint,
    currency_name:string,
    currency_code: string
    balance:number,
    state:string
}

