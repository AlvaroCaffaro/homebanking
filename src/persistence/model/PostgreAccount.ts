import { Pool } from "pg";
import { Account } from "../../LOGIC/object/account";
import {  map_transfer, Transfer } from "../../logic/object/transaction";
import { Iaccount } from "../interfaces/interfacesAccount";
import { accountCreation, accountQuery, transferCreation, transferQuery } from "../type";
import { Datetime } from "../../utils/date";

export class PostreSQLAccount implements Iaccount{

    private connection:Pool;
    
    constructor(connection:any){
        this.connection = connection;
    }

    async createTransfer(tranfer: transferCreation): Promise<null> {
     
        let poolConnection;
        try{
            poolConnection = await (this.connection).connect();
        } catch(e){
            throw new Error('fallo la conexion a la base de datos');
        }

        if(!tranfer.destination_account) throw new Error('La cuenta de destino no ha sido seleccionada');

        try {
            const result = await poolConnection.query('CALL banking.insert_transfer($1,$2,$3,$4,$5,$6)',[
                tranfer.destination_account.account_id,
                tranfer.destination_account.currency_id,
                tranfer.destination_amount,

                tranfer.remitter_account.account_id,
                tranfer.remitter_account.currency_id,
                tranfer.remitter_account
            ]);
            

            return null;

            
        } catch (e) {
           throw e; 
        }


    }
   
    async getOperations({idAccount,from,to}:{idAccount: bigint, from: Datetime, to: Datetime}): Promise<Transfer[]> {
        let poolConnection;
        try{
            poolConnection = await (this.connection).connect();
        } catch(e){
            throw new Error('fallo la conexion a la base de datos');
        }


        try {
           const result = await poolConnection.query('SELECT * FROM banking.select_transfers ($1,$2,$3)',[
                idAccount,from.toString(),
                to.toString()
            ]);

           if(result.rowCount == 0){
                return [];
           }

           const data = result.rows;
           map_transfer(data);

           return data;


        } catch (e) {
            throw e;
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
            throw e;
        }

    }


    async create(account: accountCreation): Promise<void> {
        let poolConnection;
        try {
            poolConnection = await (this.connection).connect();
        } catch (e) {
            throw new Error('fallo la conexion a la base de datos');
        }

        try {
            await poolConnection.query('INSERT INTO banking.account (currency_id,owner_id) VALUES (?,?)',[
                account.currencyId,
                account.holderId
            ]);
        
        } catch (e) {
            throw new Error('error');
        }
    }

    async get(account_id: string): Promise<Account> {
        let poolConnection;
        try {
            poolConnection = await (this.connection).connect();
        } catch (e) {
            throw new Error('fallo la conexion a la base de datos');
        }

        try {
           let result = await poolConnection.query('SELECT * FROM banking.find_account WHERE id = ?',[account_id]);
           
           if(result.rowCount == 0){
                throw new Error('El alias o el numero de cuenta no existen');
           }


           const data:accountQuery = result.rows[0];
           const account = new Account(data);

           return(account);

        } catch (e) {

            throw e;

        }

    }

}