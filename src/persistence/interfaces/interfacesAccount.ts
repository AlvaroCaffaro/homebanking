import { Account } from "../../LOGIC/object/account";
import { Transfer } from "../../logic/object/transaction";
import { Person } from "../../logic/object/user";
import { Datetime } from "../../utils/date";
import { transferCreation } from "../type";

export interface Iaccount {
    get({identifier}:{identifier:string}):Promise<Account>;  // this could be the alias or the account number
    createTransfer(tranfer:transferCreation):Promise<null>;
    getOperations({idAccount,from,to}:{idAccount:bigint,from:Datetime,to:Datetime}):Promise<Transfer[]>
    getAllOperations({idAccount,end}:{idAccount:bigint,end:Datetime}):Promise<Transfer[]>;
    getPersonsAgenda({idAccount}:{idAccount:bigint}):Promise<Person[]>;
    getAccounts({idPerson}:{idPerson:string}):Promise<Account[]>;
}