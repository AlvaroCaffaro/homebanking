import { createPostgreConnection } from "../../connection";
import { Holder } from "../../LOGIC/object/user";
import { IauthUser } from "../interfaces/interfacesAuth";
import { holderCreation } from "../type";

class PostreSQLAuth implements IauthUser{
    async match({ email, password }: { email: string; password: string; }): Promise<Holder | null > {
       
        try {
            const poolConnection = await createPostgreConnection();
        } catch (e) {
            throw new Error('fallo la conexion a la base de datos');
        }


        return null;


        // await createPostgreConnection.query('INNER JOIN ')
       // utilizar un inner join que devuelva el user junto con el holder si es vacio return null
       //  
    }
    async create(data:holderCreation): Promise<null> {
       
        return null;
        // llamar a una funcion que:  crea la persona SI NO ESTA REGISTRADA, crea el holder en estado pendiente
       // VERIFICAR ESTE ACEPTADA LA CUENTA
        // await createPostgreConnection.query('select * from ')
    }
    
}