export class TransferValidation {
    static isValidAmount({value}:{value:any}){
        
        value = Number(value);
        if(Number.isNaN(value)){
            return 'El valor debe ser de tipo numerico';
        }

        if(value < 0){
            return 'El valor debe ser positivo';
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