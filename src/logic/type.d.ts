import { personQuery } from "../persistence/type";
import { Datetime } from "../utils/date";

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

