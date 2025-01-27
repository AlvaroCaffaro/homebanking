import { Holder } from "../../logic/object/user";
import { holderCreation } from "../type";

export interface IauthUser{

    match({email,password}:{email:string,password:string}):Promise<Holder|null>;
    create(data:holderCreation):Promise<null>;
}