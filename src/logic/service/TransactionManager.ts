import { Iaccount } from "../../persistence/interfaces/interfacesAccount";
import { Datetime } from "../../utils/date";


export class OperationManager{
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

    async getOperations(idAccount:bigint,from:Datetime,to:Datetime){

        try {
            const res = await this.accountPersistence.getOperations({idAccount,from,to});  
            return res;  
        
        } catch (e) {
            return e;
        } 
        

    }




}