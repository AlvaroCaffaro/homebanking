import { Holder } from "../../logic/object/user";
import { holderCreation } from "../type";

export interface IauthUser{

    match({username,password}:{username:string,password:string}):Promise<Holder|null>;
    create(data:holderCreation):Promise<null>;
    prueba():Promise<any>;
}