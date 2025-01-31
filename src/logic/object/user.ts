import { personQuery, userQuery } from "../../persistence/type";
import { holder } from "../type";

export class Person {
    private person_id:string;
    private dni:string;
    private name:string;
    private secondname:string | null;
    private lastname:string;

    constructor(p:personQuery){
        this.person_id = p.id;
        this.dni = p.dni;
        this.name = p.name;
        this.secondname = p.secondname;
        this.lastname = p.lastname;
        
    }
        public get_id(){
            return this.person_id;
        }

        public get_dni(){
            return this.dni;
        }

        public get_name(){
            return this.name;
        }

        public get_secondname(){
            return this.secondname;
        }

        public get_lastname(){
            return this.lastname;
        }

        public get_fullname(){
            let fullname:string = this.lastname + ', ' + this.name;
            if(this.secondname) fullname+= ' ' + this.secondname;

            return fullname;
        }
}



export class Holder extends Person{
    private readonly id:string;
    private email:string;
    private username:string
    
  
    constructor(h:holder){
        super(h.person);
        this.id = h.id;
        this.username = h.username;
        this.email = h.email;
    }


    public get_id(){       
        return this.id;
    }

    public get_username(){
        return this.username;
    }

    public get_email(){
        return this.email;
    }

    public set_email(email:string){
        this.email = email;
    }
    

}


