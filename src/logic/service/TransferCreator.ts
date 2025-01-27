import { Icurrency } from "../../persistence/interfaces/interfacesCurrency";
import { Ioperations } from "../../persistence/interfaces/interfacesTransaction";
import { transferCreation } from "../../persistence/type";
import { Account } from "../object/account";
import { Transfer } from "../object/transaction";

export class TransferCreator{
    private transfer:transferCreation | null;
    private operationPersistence:Ioperations;
    private currencyPersistence:Icurrency;
    private error_message = 'no se puede realizar la transferencia'

    constructor({remmiter_accountId,currency_code,operationPersistence,currencyPersistence}:{remmiter_accountId:bigint,currency_code:string,operationPersistence:Ioperations,currencyPersistence:Icurrency}){
       this.transfer = {
            remmiter_accountId: remmiter_accountId,
            deliver_account: null,
            amount_deliver: 0,
            amount_remmiter:0,
            currency_code: currency_code
       };

       this.operationPersistence = operationPersistence;
       this.currencyPersistence = currencyPersistence;
    }

    

    set_remmiter(account:Account){
        (this.transfer as transferCreation).deliver_account = account;
    }

    set_amount(amount:number){
        if(this.transfer == null) return new Error(this.error_message);
        
        this.transfer.amount_remmiter = amount;

    }

    async create(){

        if(this.transfer == null){
            return new Error(this.error_message);
        }

        if(this.transfer.deliver_account == null){ 
            return new Error(this.error_message);
        }
        
        try{
            const rate = await this.currencyPersistence.getQuoteInLocalCurrency({baseCurrency:this.transfer.currency_code,targetCurrency:this.transfer.deliver_account.get_currency_code()});
            this.transfer.amount_deliver = rate* this.transfer.amount_remmiter;
            
        } catch(e){
            return e;
        }



        try {
            await this.operationPersistence.createTransfer(this.transfer);            
        } catch (e) {
            return e;
        }
    }


    async clear(){
        if(this.transfer == null){
            return;
        }
        this.transfer = null;

    }
}