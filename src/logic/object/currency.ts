import { currency } from "../type";

 
export class Currency{

    private id:bigint;
    private name:string;
    private code:string;

   constructor(currency:currency) { 
        this.id = currency.id;
        this.name = currency.name;
        this.code = currency.code;
   }

   public get_id(){
     return (this.id);
   }
   public get_name(){
    return(this.name);
   }
   
   public get_code(){
    return(this.code);
   }

}

export const map_currency =(data:any[])=>{
    data.map((e:currency)=> new Currency(e));
}