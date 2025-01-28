import { Pool } from "pg";
import { Holder} from "../../logic/object/user";
import { IauthUser } from "../interfaces/interfacesAuth";
import { holderCreation, userQuery } from "../type";
import bcrypt from 'bcryptjs';
import { EnvCofig } from "../../env.config";

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
            const result =  await poolConnection.query('SELECT * FROM person.person'); 
            
            //console.log('res: ', result);
            if(result.rowCount == 0){
                return null;
            }
        
            return result.rows;


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

            const result =  await poolConnection.query('SELECT * FROM person.match($1)',[username]); 
           
            if(result.rowCount == 0){
                return null;
            }

            const data:userQuery = result.rows[0];
            const isMatch = await bcrypt.compare(password, data.hashed_password);

            if(!isMatch){
                return null;
            }
        

            return new Holder({
                id:data.id,
                username:data.username,
                email:data.email,
                person:{
                    id:data.person_id, 
                    dni:data.dni,
                    name:data.name,
                    secondname:data.secondname,
                    lastname:data.lastname
                }});

        } catch (e) {
            throw e;
            //throw new Error('ha ocurrido un error en la base de datos, intente mas tarde.');
        } finally{
            poolConnection.release(); // Libera el cliente de vuelta al pool
        }
    

    }
    async create(data:holderCreation): Promise<null> {
       

        let password_hash;
        try {
            const salt_round = EnvCofig.salt_round;
            const salt = await bcrypt.genSalt(salt_round);
            password_hash = await bcrypt.hash(data.password,salt);

        } catch (e) {
            throw new Error('Error al encriptar la contraseña');
        }


        let poolConnection;
        try {
            poolConnection = await (this.pool).connect();
        } catch (e) {
            throw new Error('fallo la conexion a la base de datos');
        }

        try {
            const result =  await poolConnection.query('call person.insert_holder($1,$2,$3,$4,$5,$6,$7)',[data.person.dni,data.person.name,data.person.secondname, data.person.lastname,data.email,data.username, password_hash]);
            return null;

        } catch (e) {
            throw e;
            //throw new Error('ha ocurrido un error en la base de datos, intente mas tarde.');
        
        } finally{
            poolConnection.release();
        }

    }
    
}