import { UUID } from "crypto";
import { Iaccount } from "../../persistence/interfaces/interfacesAccount";
import { Account } from "../object/account";
import { Currency } from "../object/currency";
import { Holder } from "../object/user";

export class AccountManager{
    private persistence:Iaccount;

    constructor(persistence:Iaccount){
        this.persistence = persistence;
    }

    async applyForNewAccount(holder:Holder,currency:Currency){
        try {

            //await this.persistence.create();
        } catch (e) {
            return new Error();
        }
   
    }
    
    async getAccountsAgenda(holder:Holder){
        // da los account guardados como favoritos
    }

    async findAccount(identify:string){ // this could be alias or number of account
        // esto es facil, ya que podemos hacer un or select * from account where alias = ? | number = ?;
    }



}