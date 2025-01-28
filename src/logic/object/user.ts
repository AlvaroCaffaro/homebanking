import { holder, person } from "../type";

export class Person {
    private person_id:string;
    private dni:string;
    private name:string;
    private secondName:string | null;
    private lastname:string;

    constructor(p:person){
        this.person_id = p.id;
        this.dni = p.dni;
        this.name = p.name;
        this.secondName = p.secondname;
        this.lastname = p.lastname;
        
    }

        public get_name(){
            return this.name;
        }

        public get_dni(){
            return this.dni;
        }

        public get_secondName(){
            return this.secondName;
        }

        public get_lastname(){
            return this.lastname;
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


