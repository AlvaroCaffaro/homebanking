import { Iaccount } from "../../persistence/interfaces/interfacesAccount";
import { Icurrency } from "../../persistence/interfaces/interfacesCurrency";
import { transferCreation } from "../../persistence/type";
import { Account } from "../object/account";


export class TransferCreator{
    private transfer:transferCreation | null;
    private accountPersistence:Iaccount;
    private currencyPersistence:Icurrency;
    private error_message = 'no se puede realizar la transferencia';

    constructor({accountPersistence,currencyPersistence}:{accountPersistence:Iaccount,currencyPersistence:Icurrency}){
       this.transfer = {
            remitter_account: {
                account_id:null,
                currency_code:null,
                currency_id:null
            },
            destination_account: {
                account_id:null,
                currency_code:null,
                currency_id:null
            },
            destination_amount: 0,
            remitter_amount:0,
       };


       this.accountPersistence = accountPersistence;
       this.currencyPersistence = currencyPersistence;
    }


    set_remitter({remitter_accountId,remitter_currencyId,remitter_currencyCode}:{remitter_accountId:bigint,remitter_currencyId:bigint,remitter_currencyCode:string}){

        if(this.transfer == null) return new Error(this.error_message);

        this.transfer.remitter_account = {
            account_id:remitter_accountId,
            currency_id:remitter_currencyId,
            currency_code:remitter_currencyCode
        };
    }
    

    async set_destination({identifier}:{identifier:string}):Promise<Account | Error>{

        if(this.transfer == null) return new Error(this.error_message);
        try {
           const result:Account = await this.accountPersistence.get({identifier}); 
           this.transfer.destination_account = {
                account_id:result.get_id(),
                currency_id:result.get_currency().get_id(),
                currency_code: result.get_currency().get_code()
           }
        
            return(result);
        
        } catch (e) {
            return new Error('error');
        }

    }

    async set_amount(amount:number){

        if(this.transfer == null) return new Error(this.error_message);
        if(this.transfer.destination_account.currency_code == null) return new Error('La cuenta destino debe ser seleccionada primero.');
        if(this.transfer.remitter_account.currency_code == null) return new Error('fff');
        this.transfer.remitter_amount = amount;

        try{
            const rate = await this.currencyPersistence.getQuoteInLocalCurrency({
                baseCurrency:this.transfer.remitter_account.currency_code ,
                targetCurrency:this.transfer.destination_account.currency_code
            });

            this.transfer.destination_amount = rate* this.transfer.remitter_amount;
            
        } catch(e){
            return e;
        }


    }


    async create(){

        if(this.transfer == null){
            return new Error(this.error_message);
        }

        if(this.transfer.destination_account == null){ 
            return new Error(this.error_message);
        }
        


        try {
            await this.accountPersistence.createTransfer(this.transfer);
            return(this.clear());       
        } catch (e) {
            return e;
        }

    }


    async clear(){

        if(this.transfer == null){
            return;
        }

        const transfer = this.transfer;
        this.transfer = null;

        return transfer;

    }
        
}