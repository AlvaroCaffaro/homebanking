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


    async getBalance({idAccount}:{idAccount:string}){
        try {
            const result = await this.accountPersistence.getBalance({idAccount:idAccount});  
            return result;
            
        } catch (e) {
            return e as Error;
        }  
    }

    async updateAlias({idAccount,newAlias}:{idAccount:string,newAlias:string}){

        try {
            await this.accountPersistence.updateAlias({idAccount:idAccount,newAlias:newAlias});  
        
        } catch (e) {
            return e as Error;
        }    

    }

    async getLastOperations({idAccount}:{idAccount:string}){
     
        try {
            const result = await this.accountPersistence.getLastOperations({idAccount:idAccount});  
            return result;
        } catch (e) {
            return e as Error;
        }  
    }


    async getOperations({idAccount,from,to}:{idAccount:string,from:Datetime,to:Datetime}):Promise<Transfer[]|Error>{

        try {
            const res = await this.accountPersistence.getOperations({idAccount,from,to});  
            return res;  
        
        } catch (e) {
            return e as Error;
        }    

    }



}