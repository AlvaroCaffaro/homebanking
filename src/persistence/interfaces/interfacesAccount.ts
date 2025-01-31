import { Account } from "../../LOGIC/object/account";
import { Transfer } from "../../logic/object/transaction";
import { Datetime } from "../../utils/date";
import { transferCreation } from "../type";

export interface Iaccount {
    get(identifier:string):Promise<Account>;  // this could be the alias or the account number
    createTransfer(tranfer:transferCreation):Promise<null>;
    getOperations({idAccount,from,to}:{idAccount:bigint,from:Datetime,to:Datetime}):Promise<Transfer[]>
    getAllOperations({idAccount,end}:{idAccount:bigint,end:Datetime}):Promise<Transfer[]>;
}