import { Icurrency } from "../../persistence/interfaces/interfacesCurrency";
import { Ioperations } from "../../persistence/interfaces/interfacesTransaction";
import { Account } from "../object/account";
import { Currency } from "../object/currency";


export class OperationManager{
    private persistenceOperation:Ioperations;

    constructor(persistenceOperation:Ioperations,persistenceCurrency:Icurrency){
        this.persistenceOperation = persistenceOperation;
    }

    async getAllOperations(accountId:bigint){
        try{
            const res = await this.persistenceOperation.getAllOperations(accountId);
            return res;
        } catch(e){
            return e;
        }
    }

    async getOperation(accountId:bigint,from:Date,to:Date){

        try {
            const res = await this.persistenceOperation.getOperations(accountId,from,to);  
            return res;  
        
        } catch (e) {
            return e;
        } 
        

    }




}