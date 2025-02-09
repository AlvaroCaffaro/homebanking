import { Datetime } from "../utils/date";

export class AccountValidation{
    static isValidDate({value}:{value:any}){

        if(!(value instanceof Datetime)) return 'La fecha introducida no es valida';

        if(isNaN(value.getDay())) return 'La fecha introducida no es valida';            
        
        const today = new Datetime();
        if(!value.older(today)){
            return 'Fecha fuera de rango. La fecha debe ser igual a mas antigua que hoy'
        }

        return null;
    }

    
    static isValidAlias({value}:{value:string}){
 
        if(!value){
            return 'Debe introducir un alias';
        }
        
        if(value.length < 6){
            return 'El alias debe contener al menos 6 caracteres';
        }
        
        return null;
    } 
}