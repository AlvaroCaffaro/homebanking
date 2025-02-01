import { Pool } from "pg";
import {  map_personalAccount, PersonalAccount } from "../../LOGIC/object/account";
import { Person } from "../../logic/object/user";
import { IinformationUser } from "../interfaces/interfacesInformation";
import { accountCreation, personalAccountQuery, personQuery } from "../type";
import { generateAlias } from "../../utils/generateAlias";

export class PostgreInformationUser implements IinformationUser{

    private pool:Pool;
    constructor(poolConnection:Pool){
        this.pool = poolConnection;
    }


    async create(accountCreation: accountCreation): Promise<null> {
        let poolConnection;

        try {
            poolConnection= await this.pool.connect();            
        
        } catch (e) {
            throw e;
        }

        try {
            const result = await poolConnection.query('insert into banking.account (owner_id,alias,currency_id) values ($1,$2,$3)',[accountCreation.holderId,generateAlias(),accountCreation.currencyId]);
           
            return null;
         

        } catch (e) {
            throw e;
        }finally{
            poolConnection.release();
        }


    }

    async get_personalInfromation({ id }: { id: string; }): Promise<Person > {

        let poolConnection         ;

        try {
            poolConnection = await this.pool.connect();            
        } catch (e) {
            throw e;
        }

        try {
            const result = await poolConnection.query('SELECT * FROM person.person where id = $1',[id]);
           
            const data:personQuery = result.rows[0];

            return new Person(data);

        } catch (e) {
            throw e;
        } finally{
            poolConnection.release();
        }


    }
    
    async get_accounts({ id}: { id: string}): Promise<PersonalAccount[] > {
       
        let poolConnection;
        try {
            poolConnection= await this.pool.connect();            
        } catch (e) {
            throw e;
        }

        try{
            const result = await poolConnection.query('SELECT * FROM banking.select_personalAccounts($1)',[id]);
            
            if(result.rowCount == 0){
                return [];
            }
            
            const data:personalAccountQuery[] = result.rows;
            
            return map_personalAccount(data);

            
        } catch(e){
            throw e;
        } finally{
            poolConnection.release();
        }

    }
    update_password({ id ,new_password}: { id: string,new_password:string }): Promise<null> {
        throw new Error("Method not implemented.");
    }
    update_username({ id, new_username }: { id: string,new_username:string }): Promise<null> {
        throw new Error("Method not implemented.");
    }
    
}