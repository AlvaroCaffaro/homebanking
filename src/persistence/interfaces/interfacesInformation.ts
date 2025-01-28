import { Account } from "../../LOGIC/object/account";
import { Person } from "../../logic/object/user";

export interface IinformationUser{
    get_personalInfromation({id}:{id:string}):Promise<Person>;
    get_accounts({id}:{id:string}):Promise<Account>;   
    update_password({id,new_password}:{id:string,new_password:string}):Promise<null>;
    update_username({id,new_username}:{id:string,new_username:string}):Promise<null>;
}