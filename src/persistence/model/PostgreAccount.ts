import { Account ,map_account} from "../../LOGIC/object/account";
import { Iaccount } from "../interfaces/interfacesAccount";
import { accountCreation } from "../type";
import { createPostgreConnection } from '../../connection';

export class PostreSQLAccount implements Iaccount{
    async create(account: accountCreation): Promise<void> {
        let poolConnection;
        try {
            poolConnection = await createPostgreConnection();
        } catch (e) {
            throw new Error('fallo la conexion a la base de datos');
        }

        try {
            await poolConnection.query('INSERT INTO banking.account (currency_id,owner_id) VALUES (?,?)',[account.currencyId,account.holderId]);
        } catch (e) {

            throw new Error('error');
            
        }
    }

    async get(account_id: bigint): Promise<Account | void> {
        let poolConnection;
        try {
            poolConnection = await createPostgreConnection();
        } catch (e) {
            throw new Error('fallo la conexion a la base de datos');
        }

        try {
           let result = await poolConnection.query('SELECT * FROM banking.account WHERE id = ?',[account_id]);
           result = map_account(result);
           if(result.length == 0){return;}
           
           return(result[0]);
        } catch (e) {

            throw new Error('error');
            
        }

    }

}