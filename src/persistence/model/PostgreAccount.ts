import { Pool } from "pg";
import { Account, map_account } from "../../LOGIC/object/account";
import {  map_transfer, Transfer } from "../../logic/object/transaction";
import { Iaccount } from "../interfaces/interfacesAccount";
import { accountCreation, accountQuery, personQuery, transferCreation, transferQuery } from "../type";
import { Datetime } from "../../utils/date";
import { map_person, Person } from "../../logic/object/user";
import { ConnectionError, DatabaseError, NotEnoughBalanceError } from "../../logic/object/error";

export class PostreSQLAccount implements Iaccount{

    private connection:Pool;
    
    constructor(connection:any){
        this.connection = connection;
    }

    async getPersonsAgenda({ idAccount }: { idAccount: bigint; }): Promise<Person[]> {
            let poolConnection;
            try{
                poolConnection = await (this.connection).connect();
            } catch(e){
                throw new ConnectionError();
            }
    
    
            try {
               const result = await poolConnection.query('SELECT * FROM person.lastest_persons ($1)',[
                    idAccount
                ]);
    
               if(result.rowCount == 0){
                    return [];
               }
    
               const data:personQuery[] = result.rows;

               return(map_person(data));
    
    
            } catch (e) {
                throw new DatabaseError();
            
            } finally{
                poolConnection.release(); 
            }
    
    }    

    async getAccounts({ idPerson }: { idPerson: string; }): Promise<Account[]> {
        let poolConnection;
            try{
                poolConnection = await (this.connection).connect();
            } catch(e){
                throw new ConnectionError();
            }
    
    
            try {
               const result = await poolConnection.query('SELECT * FROM banking.select_personAccounts ($1)',[
                    idPerson
                ]);
    
               if(result.rowCount == 0){
                    return [];
               }
    
               const data:accountQuery[] = result.rows;

               return(map_account(data));
    
    
            } catch (e) {

                throw new DatabaseError();

            } finally{
                poolConnection.release(); 
            }
    }

    async createTransfer(transfer: transferCreation): Promise<null> {
     
        let poolConnection;
        try{
            poolConnection = await (this.connection).connect();
        } catch(e){
            throw new ConnectionError();
        }

        try {
            const data = await poolConnection.query('SELECT * FROM banking.verify_balance($1,$2)',[transfer.remitter_account.account_id,transfer.remitter_amount]);
            const isEnough = ((data.rows[0]).verify_balance) as boolean;
            
            if(!isEnough){
                throw new NotEnoughBalanceError();
            }
            
        } catch (e) {
            
            if(e instanceof NotEnoughBalanceError){
                throw e;
            } 
            
            throw new DatabaseError();
            
        }


        try {

            const _ = await poolConnection.query('CALL banking.insert_transfer($1,$2,$3,$4,$5,$6)',[
                Number(transfer.destination_account.account_id),
                Number(transfer.destination_account.currency_id),
                transfer.destination_amount,
                Number(transfer.remitter_account.account_id),
                Number(transfer.remitter_account.currency_id),
                transfer.remitter_amount
            ]);

            return null;

            
        } catch (e) {
         
            throw new DatabaseError();
        
        }  finally{
            poolConnection.release(); 
        }


    }
   
    async getOperations({idAccount,from,to}:{idAccount: bigint, from: Datetime, to: Datetime}): Promise<Transfer[]> {
        let poolConnection;
        try{
            poolConnection = await (this.connection).connect();
        } catch(e){
            throw new ConnectionError();
        }


        try {
           const result = await poolConnection.query('SELECT * FROM banking.select_transfers ($1,$2,$3)',[
                idAccount,from.toString(),
                to.toString()
            ]);

           if(result.rowCount == 0){
                return [];
           }

           const data:transferQuery[] = result.rows;
           return map_transfer(data);

           


        } catch (e) {
            throw new DatabaseError();
       
        } finally{
            poolConnection.release(); 
        }

    }
    async getAllOperations({idAccount,end}:{idAccount: bigint,end:Datetime}): Promise<Transfer[]> {
        try{
            return(await this.getOperations({
                idAccount:idAccount,
                from:end.oneMonthAgo(),
                to:end
            }));

        } catch(e){
            throw new DatabaseError();
        }

    }


    async create(account: accountCreation): Promise<void> {
        let poolConnection;
        
        try {
            poolConnection = await (this.connection).connect();
        } catch (e) {
            throw new ConnectionError();
        }

        let count = 0;
        const max = 2;
        while(count < max){  // I do this in case the alias generator fails
            try {
                await poolConnection.query('INSERT INTO banking.account (currency_id,owner_id) VALUES (?,?)',[
                    account.currencyId,
                    account.holderId
                ]);
        
            } catch (e) {
                count++;
         

                if(count >= max ){ 
                    poolConnection.release(); 
                    throw new DatabaseError();
                }
            } 
        }   

        poolConnection.release(); 
    }
    
    async get({identifier}:{identifier: string}): Promise<Account | null> {
        let poolConnection;
        try {
            poolConnection = await (this.connection).connect();
        } catch (e) {
            throw new ConnectionError();
        }

        try {
           let result = await poolConnection.query('SELECT * FROM banking.find_account($1)',[identifier]);
           
           if(result.rowCount == 0){
                return null;
           }

           const data:accountQuery = result.rows[0];
           const account = new Account(data);

           return(account);

        } catch (e) {

            throw new DatabaseError();

        }finally{
            poolConnection.release(); 
        }

    }

}