import { Account, PersonalAccount } from "../../LOGIC/object/account";
import { Transfer } from "../../logic/object/transaction";
import { Person } from "../../logic/object/user";
import { Datetime } from "../../utils/date";
import { transferCreation } from "../type";

export interface Iaccount {
    get({identifier}:{identifier:string}):Promise<Account | null>;  // the identifier could be the alias or the account number
    createTransfer(tranfer:transferCreation):Promise<null>;
    getOperations({idAccount,from,to}:{idAccount:string,from:Datetime,to:Datetime}):Promise<Transfer[]>
    getLastOperations({idAccount}:{idAccount:string}):Promise<Transfer[]>;
    getPersonsAgenda({idAccount}:{idAccount:string}):Promise<Person[]>;
    getPersonAccounts({idPerson}:{idPerson:string}):Promise<Account[]>;  
    getInfo({idAccount}:{idAccount:string}):Promise<PersonalAccount>;
    updateAlias({idAccount,newAlias}:{idAccount:string,newAlias:string}):Promise<null>;  
}