import { Iaccount } from "../../persistence/interfaces/interfacesAccount";
import { Icurrency } from "../../persistence/interfaces/interfacesCurrency";
import { transferCreation } from "../../persistence/type";
import { Account } from "../object/account";


export class TransferCreator{
    private accountPersistence:Iaccount;
    private currencyPersistence:Icurrency;
    private error_message = 'no se puede realizar la transferencia';

    constructor({accountPersistence,currencyPersistence}:{accountPersistence:Iaccount,currencyPersistence:Icurrency}){
       this.accountPersistence = accountPersistence;
       this.currencyPersistence = currencyPersistence;
    }

    async findAccount({identifier}:{identifier:string}):Promise<Account | Error>{
        try {
            const account = await this.accountPersistence.get({identifier:identifier});   
            if(account == null){
                return new Error('El alias/numero de cuenta solicitado no existe')
            }  
            return account;       
        
        } catch (e) {
            return e as Error;
        }
    }

    async create({destination_id,destination_currencyId, destination_currencyCode,remitter_id,remitter_currencyId,remitter_currencyCode,remitter_amount}:{destination_id:string,destination_currencyId:string,destination_currencyCode:string,remitter_id:string,remitter_currencyId:string,remitter_currencyCode:string,remitter_amount:number}){

        let destination_amount = 0;

        try {
            const rate = await this.currencyPersistence.getQuoteInLocalCurrency({
                baseCurrency:remitter_currencyCode,
                targetCurrency:destination_currencyCode
            });

            destination_amount = rate * Number(remitter_amount);

        } catch (e) {
            return e;
        }


        console.log('remmiter:' , remitter_amount);
        console.log('destination: ', destination_amount);

        try {
            const result = await this.accountPersistence.createTransfer({
                destination_account: {
                    account_id: (destination_id),
                    currency_id: (destination_currencyId),
                    currency_code: destination_currencyCode
                },
                remitter_account: {
                    account_id: (remitter_id),
                    currency_id: (remitter_currencyId),
                    currency_code: remitter_currencyCode
                },
                remitter_amount: Number(remitter_amount),
                destination_amount: destination_amount
            });
       
        } catch (e) {
            return e;
        }

     }
        
}