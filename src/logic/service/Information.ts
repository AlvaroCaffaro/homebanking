import { IinformationUser } from "../../persistence/interfaces/interfacesInformation";
import { Account } from "../object/account";
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
    async get_accounts({ id }: { id: string; }): Promise<Account[] | Error> {
        try{
            const result = await this.persistence.get_accounts({id});
            if(result == null){
                throw new Error('no posee ninguna cuenta');
            }

            return result ;
        
        } catch(e:any){
            return e;
        }
    }
    async update_password({ id, new_password }: { id: string; new_password: string; }): Promise<null> {
        throw new Error("Method not implemented.");
    }
    async update_username({ id, new_username }: { id: string; new_username: string; }): Promise<null> {
        throw new Error("Method not implemented.");
    }
}
