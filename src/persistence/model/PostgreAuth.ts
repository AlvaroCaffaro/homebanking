import { Pool } from "pg";
import { Holder} from "../../logic/object/user";
import { IauthUser } from "../interfaces/interfacesAuth";
import { holderCreation, userQuery } from "../type";

export class PostreSQLAuth implements IauthUser{
    private pool:Pool;

    constructor(connection:Pool){
        this.pool = connection;
    }
    
    async prueba(): Promise<any> {
        let poolConnection;
        try {
            poolConnection = await (this.pool).connect();
        } catch (e) {
            throw e;
            //throw new Error('fallo la conexion a la base de datos');
        }


        try {
            const result:any =  await poolConnection.query('SELECT * FROM person.person'); 
            
            //console.log('res: ', result);
            return result.rows;
            if(result == null){
                return null;
            }
        

        } catch(e){

            throw e;
        
        } finally{
            poolConnection.release();

        }


}

    async match({ username, password }: { username: string; password: string; }): Promise<Holder | null > {
        
        let poolConnection;
        try {
            poolConnection = await (this.pool).connect();
        } catch (e) {
            throw e;
            //throw new Error('fallo la conexion a la base de datos');
        }


        try {
            const result =  await poolConnection.query('SELECT * FROM match($1,$2)',[username,password]); 
            
            return (result.rows) as any;
            if(result == null){
                return null;
            }
        
            let email = 'pepito@gmail.com';

          /*  return new Holder({
                id:result.id,
                username:result.username,
                email:email,
                person:{
                    id:result.person_id, 
                    dni:result.dni,
                    name:result.name,
                    secondname:result.secondname,
                    lastname:result.lastname
                }});
*/
        } catch (e) {
            throw new Error('ha ocurrido un error en la base de datos, intente mas tarde.');
        } finally{
            poolConnection.release(); // Libera el cliente de vuelta al pool
        }
    

    }
    async create(data:holderCreation): Promise<null> {
       
        let poolConnection;
        try {
            poolConnection = await (this.pool).connect();
        } catch (e) {
            throw new Error('fallo la conexion a la base de datos');
        }

        try {
            const result =  await poolConnection.query('call insert_holder(?,?,?,?,?)',[data.person.dni,data.person.name, data.person.lastname,data.username, data.password]); 

            return null;
            //return result;

        } catch (e) {
            throw new Error('ha ocurrido un error en la base de datos, intente mas tarde.');
        }

    }
    
}