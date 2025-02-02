import { Iaccount } from "../../persistence/interfaces/interfacesAccount";
import { Icurrency } from "../../persistence/interfaces/interfacesCurrency";
import { transferCreation } from "../../persistence/type";
import { Datetime } from "../../utils/date";
import { Transfer } from "../object/transaction";
import { Person } from "../object/user";


export class AccountManager{
    private accountPersistence:Iaccount;

    constructor({accountPersistence}:{accountPersistence:Iaccount}){
        this.accountPersistence = accountPersistence;
    }

    async getAllOperations(idAccount:bigint,end:Datetime){
        try{
            const res = await this.accountPersistence.getAllOperations({idAccount,end});
            return res;
        } catch(e){
            return e;
        }
    }

    async getOperations({idAccount,from,to}:{idAccount:bigint,from:Datetime,to:Datetime}):Promise<Transfer[]|Error>{

        try {
            const res = await this.accountPersistence.getOperations({idAccount,from,to});  
            return res;  
        
        } catch (e) {
            return e as Error;
        }    

    }

        
    async getAccountAgenda({idAccount}:{idAccount:bigint}):Promise<Person[] | Error>{
        
        try {
            const res = await this.accountPersistence.getPersonsAgenda({idAccount});
            return res;
        } catch (e) {
            return e as Error;
        }
     }



}