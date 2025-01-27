import { Icurrency } from "../../persistence/interfaces/interfacesCurrency";
import { Ioperations } from "../../persistence/interfaces/interfacesTransaction";
import { transferCreation } from "../../persistence/type";
import { Account } from "../object/account";
import { Transfer } from "../object/transaction";

export class TransferCreator{
    private transfer:transferCreation;
    private operationPersistence:Ioperations;
    private currencyPersistence:Icurrency;

    constructor({deliver_accountId,currency_code,operationPersistence,currencyPersistence}:{deliver_accountId:bigint,currency_code:string,operationPersistence:Ioperations,currencyPersistence:Icurrency}){
       this.transfer = {
            deliver_accountId: deliver_accountId,
            remmiter_account:null,
            amount: 0,
            currency_code: currency_code
       };

       this.operationPersistence = operationPersistence;
       this.currencyPersistence = currencyPersistence;
    }

    

    set_remmiter(account:Account){
        this.transfer.remmiter_account = account;
    }

    async create(){
        if(this.transfer.remmiter_account == null){ 
            return new Error('error');
        }


        
        try{
            await this.currencyPersistence.getQuoteInLocalCurrency();

        } catch(e){

        }



        try {
            await this.operationPersistence.createTransfer(this.transfer);            
        } catch (e) {
            return e;
        }
    }


    async clear(){
        this.transfer = null;
    }
}