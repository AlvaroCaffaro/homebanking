import { IauthUser } from "../../persistence/interfaces/interfacesAuth";
import { holderCreation } from "../../persistence/type";
import { IncorrectDataError, MaxTryError } from '../object/error';
import { Holder } from "../object/user";

export class Authenticate{
    private persistence:IauthUser;
    private tryCounter:number;
    // esto se utiliza para limitar la cantidad de intentos a un inicio de sesion (forma de tratar de evitar un ataque de fuerza bruta)
    private maxTry:number = 6;
  
    constructor(authPersistence:IauthUser){
        this.persistence = authPersistence;
        this.tryCounter = 0;
    }

    public async match({username,password}:{username:string,password:string}):Promise<Holder | Error> {

        if(this.tryCounter >= this.maxTry){
            return(new MaxTryError());    
        }

        // HERE WILL CHANGE THE PASSWORD;

        let data = null;
        try{ 
            data = await this.persistence.match({username:username,password:password});
        } catch(e:any){
            return e as Error;
        }

        this.tryCounter = this.tryCounter++;
        if(data == null){
            return( new IncorrectDataError());
        }

        return(data);

    }

    public async register( data: holderCreation): Promise<Error | null>{

        const error = await this.persistence.create(data);
        return error;
    }

    public async prueba (){
        try{
            const result =await this.persistence.prueba();
            return result;
        }   catch(e){
            return e as Error;
        }
    }

}
