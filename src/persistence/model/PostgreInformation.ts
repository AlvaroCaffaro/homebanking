import { Pool } from "pg";
import { Account, map_account } from "../../LOGIC/object/account";
import { Person } from "../../logic/object/user";
import { IinformationUser } from "../interfaces/interfacesInformation";
import { accountCreation, accountQuery, personQuery, userQuery } from "../type";
import { account } from "../../logic/type";
import { generateAlias } from "../../utils/generateAlias";

export class PostgreInformationUser implements IinformationUser{

    private pool:Pool;
    constructor(connection:Pool){
        this.pool = connection;
    }


    async create(accountCreation: accountCreation): Promise<null> {
        let connection;

        try {
            connection = await this.pool.connect();            
        
        } catch (e) {
            throw e;
        }

        try {
            const result = await connection.query('insert into banking.account (owner_id,alias,currency_id) values ($1,$2,$3)',[accountCreation.holderId,generateAlias(),accountCreation.currencyId]);
           
            return null;
         

        } catch (e) {
            throw e;
        }

    }

    async get_personalInfromation({ id }: { id: string; }): Promise<Person > {

        let connection;

        try {
            connection = await this.pool.connect();            
        } catch (e) {
            throw e;
        }

        try {
            const result = await connection.query('SELECT * FROM person.person where id = $1',[id]);
           
            const data:personQuery = result.rows[0];

            return new Person(data);

        } catch (e) {
            throw e;
        }

    }
    
    async get_accounts({ id}: { id: string}): Promise<Account[] | null> {
       
        let connection;
        try {
            connection = await this.pool.connect();            
        } catch (e) {
            throw e;
        }

        try{
            const result = await connection.query('SELECT * FROM banking.select_personalAccounts($1)',[id]);
            
            if(result.rowCount == 0){
                return null;
            }
            
            const data:accountQuery[] = result.rows;
            
            map_account(data);
            return (data as unknown as Account[]);

            
        } catch(e){
            throw e;
        }

    }
    update_password({ id ,new_password}: { id: string,new_password:string }): Promise<null> {
        throw new Error("Method not implemented.");
    }
    update_username({ id, new_username }: { id: string,new_username:string }): Promise<null> {
        throw new Error("Method not implemented.");
    }
    
}