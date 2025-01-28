import { Account } from "../../LOGIC/object/account";
import { Person } from "../../logic/object/user";
import { IinformationUser } from "../interfaces/interfacesInformation";

export class PostgreInformationUser implements IinformationUser{
    get_personalInfromation({ id }: { id: string; }): Promise<Person> {
        throw new Error("Method not implemented.");
    }
    get_accounts({ id}: { id: string}): Promise<Account> {
        throw new Error("Method not implemented.");
    }
    update_password({ id ,new_password}: { id: string,new_password:string }): Promise<null> {
        throw new Error("Method not implemented.");
    }
    update_username({ id, new_username }: { id: string,new_username:string }): Promise<null> {
        throw new Error("Method not implemented.");
    }
    
}