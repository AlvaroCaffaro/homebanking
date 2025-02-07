export class TransferValidation {
    static isValidAmount({value}:{value:any}){
        
        if(!value){
            return 'Debe introducir un valor numérico';
        }
        
        value = Number(value);
        if(Number.isNaN(value)){
            return 'El valor debe ser de tipo numerico';
        }

        if(value < 0){
            return 'El valor debe ser positivo';
        }

        return null;
            
    }
   

}