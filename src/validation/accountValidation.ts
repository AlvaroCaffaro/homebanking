export class AccountValidation{
    static isValidDate({value}:{value:any}){
        if(value instanceof Date){
            if(isNaN(value.getDay())) return 'La fecha introducida no es valida';
            
            return null;
        }

        if(!(value instanceof String)){
            return 'La fecha introducida no es valida';
        }

        let year = Number(value.substring(0, 4));  
        let month = Number(value.substring(5, 7));
        let day = Number(value.substring(8, 10));
        
        if(Number.isNaN(year) || Number.isNaN(month) || Number.isNaN(day)){
            return 'La fecha no es valida';
        }

        return null;

    }

    
    static isValidAlias({value}:{value:string}){
 
        if(value.length < 6){
            return 'El alias debe contener al menos 6 caracteres';
        }
        
        return null;
    } 
}