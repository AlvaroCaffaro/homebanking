import { Account } from "../../LOGIC/object/account";
import { accountCreation } from "../type";

export interface Iaccount {
    create(account:accountCreation):Promise<void>;
    get(account_id:bigint):Promise<Account | void>;
}