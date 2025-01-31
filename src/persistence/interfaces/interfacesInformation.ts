import { Account, PersonalAccount } from "../../LOGIC/object/account";
import { Person } from "../../logic/object/user";
import { accountCreation } from "../type";

export interface IinformationUser{
    get_personalInfromation({id}:{id:string}):Promise<Person>;
    get_accounts({id}:{id:string}):Promise<PersonalAccount[] | null>;   
    update_password({id,new_password}:{id:string,new_password:string}):Promise<null>;
    update_username({id,new_username}:{id:string,new_username:string}):Promise<null>;
    create(accountCreation:accountCreation):Promise<null>;
}