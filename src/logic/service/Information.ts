import { IinformationUser } from "../../persistence/interfaces/interfacesInformation";
import { accountCreation } from "../../persistence/type";
import { Account, PersonalAccount } from "../object/account";
import { Person } from "../object/user";

export class InformationUser{

    private persistence:IinformationUser
    constructor(persistence:IinformationUser){
        this.persistence = persistence;
    }
    async get_personalInfromation({ id }: { id: string; }):Promise<Person | Error>{
        
        try {
            const result = await this.persistence.get_personalInfromation({id:id});
            
            return result;
            
        } catch (e:any) {
            return e;
        }

    }
    async get_accounts({ id }: { id: string; }): Promise<PersonalAccount[] | Error> {
        try{
            const result = await this.persistence.get_accounts({id});
            if(result.length == 0){
                throw new Error('no posee ninguna cuenta');
            }

            return result;
        
        } catch(e:any){
            return e;
        }
    }

    async create_account(account:accountCreation):Promise<null | Error>{

        try {
            await this.persistence.create(account);
            return null;
        } catch (e) {
            return e as Error;
        }
    }

    async update_password({ id, new_password }: { id: string; new_password: string; }): Promise<null | Error> {
        try {
            await this.persistence.update_password({id,new_password});
            return null
        } catch (e) {
            return e as Error;
        }
    }

    async update_username({ id, new_username }: { id: string; new_username: string; }): Promise<null | Error> {
        try {
            await this.persistence.update_username({id,new_username});
            return null
        } catch (e) {
            return e as Error;
        }
    }
}
