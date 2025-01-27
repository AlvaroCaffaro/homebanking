/*import { User } from "../../LOGIC/object/user";
import { IauthUser } from "../interfaces/interfacesAuth";
//import { createMYSQLConnection} from '../../connection';
import {randomUUID} from 'node:crypto';
import bcrypt from 'bcrypt';
import { ConnectionError, DatabaseError } from "../../LOGIC/object/error";

export class MysqlAuth implements IauthUser{

    constructor(){}

    async create({ name, email, password }: { name: string; email: string; password: string; }): Promise<null|Error> {
        
        let connection;
        try {
    //        connection = await createMYSQLConnection();            
        } catch (e) {
            return new ConnectionError();
        }
        
        // encriptamos la contraseña antes de enviarla a la base de datos
        const passwordHash = await bcrypt.hash(password, process.env.SALT_ROUND);

        try {
            await connection.query('INSERT INTO usuarios (id,nombre, password, email) VALUES (?, ?, ?)',[randomUUID(),name, passwordHash, email]);            
        } catch (e) {
            return new DatabaseError();

        } finally{
            await connection.end();
        }


        return null;


    }
    
    async match({ email, password }: { email: string; password: string; }): Promise<User | Error | null>{

        let connection;
        try {
            connection = await createMYSQLConnection();    
        } catch (e) {
            return new ConnectionError();
        }
        
        const [rows]: any = await connection.execute('SELECT id,name,email,password FROM usuarios WHERE email = ?', [email]);

        if (rows.length === 0) {
            return null;
        }

        const isPasswordValid = await bcrypt.compare(password, rows[0].password);

        await connection.end();

        if (isPasswordValid) {
            return new User({id:rows[0].id, email: rows[0].email, name: rows[0].name});
        } 

        return null;
    }
    
}

*/;