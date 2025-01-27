import { createPostgreConnection } from "../../connection";
import { Holder} from "../../logic/object/user";
import { IauthUser } from "../interfaces/interfacesAuth";
import { holderCreation } from "../type";

export class PostreSQLAuth implements IauthUser{
    async match({ username, password }: { username: string; password: string; }): Promise<Holder | null > {
       
        let poolConnection;
        try {
            poolConnection = await createPostgreConnection();
        } catch (e) {
            throw new Error('fallo la conexion a la base de datos');
        }


        try {
            const result =  await poolConnection.query('SELECT * FROM match(?,?)',[username,password]); 
            
            if(result == null){
                return null;
            }
        
            let email = 'pepito@gmail.com';

            return new Holder({
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

        } catch (e) {
            throw new Error('ha ocurrido un error en la base de datos, intente mas tarde.');
        }
    

    }
    async create(data:holderCreation): Promise<null> {
       
        let poolConnection;
        try {
            poolConnection = await createPostgreConnection();
        } catch (e) {
            throw new Error('fallo la conexion a la base de datos');
        }

        try {
            const result =  await poolConnection.query('call insert_holder(?,?,?,?,?)',[data.person.dni,data.person.name, data.person.lastname,data.username, data.password]); 
             
            return result;

        } catch (e) {
            throw new Error('ha ocurrido un error en la base de datos, intente mas tarde.');
        }

    }
    
}