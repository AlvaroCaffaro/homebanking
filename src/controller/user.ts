import { Account } from "../LOGIC/object/account";
import { Person } from "../logic/object/user";

export class userController{

    private persistence:any;

    constructor(persistence:any){
        this.persistence = persistence;
    }

    public async get_personalInformation(req:any,res:any){

        const person:Person = await this.persistence.get_personalInfromation(req.session.id);
        
        res.send({
            "dni": person.get_dni(),
            "name": person.get_name(),
            "secondname":person.get_secondName(),
            "lastname": person.get_secondName()        
        });

    }

    public async get_personalAccounts(req:any,res:any){
        const account:Account = await this.persistence.get_accounts(req.session.id);
        
    }
}