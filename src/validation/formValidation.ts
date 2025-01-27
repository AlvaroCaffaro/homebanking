export class FormValidator{
 
    static isValidPassword({value}:{value:string}){ 
        if(typeof value !== 'string'){
            return false;
        }

        if(value.length < 6 || value.length > 90){
            return false;
        }

        return true;
    }

    static isValidEmail({value}:{value:string}){

        if(typeof value !== 'string'){
            return false;
        }

        if(!value.includes("@") || !value.includes(".")){
            return false;
        }

        if(value.length < 7 || value.length >= 256){
            return false;
        }

        return true;

    }

    static isValidName({value}:{value:string}){
        if(typeof value !== 'string'){
            return false;
        }
        
        if(value.length < 6 || value.length > 90){
            return false;
        }

        return true;
    }

    
}