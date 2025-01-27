import { holder, person } from "../type";

class Person {
    private id:string;
    private dni:string;
    private name:string;
    private secondName:string | null;
    private lastname:string;

    constructor(p:person){
        this.id = p.id;
        this.dni = p.dni;
        this.name = p.name;
        this.secondName = p.secondName;
        this.lastname = p.lastname;
        
    }

        public get_id(){
            return this.id;
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



export class Holder{
    private readonly id:string;
    private email:string;
    private username:string
    private person: Person;
    
  
    constructor(h:holder){
        this.id = h.id;
        this.username = h.username;
        this.email = h.email;
        this.person = new Person(h.person)
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


