export class FormValidator{
 
    static isValidPassword({value}:{value:string}){ 
        if(!value){
            return 'Debe introducir una contraseña';
        }

        if(value.length < 6 || value.length > 60){
            return 'La contraseña debe contener al menos 6 caracteres y como maximo 60';
        }

        return null;
    }

    static isValidEmail({value}:{value:string}){

        if(!value){
            return 'Debe introducir un mail';
        }

        if(!value.includes("@") || !value.includes(".")){
            return 'El email introducido no es valido.';
        }

        if(value.length < 7 || value.length >= 256){
            return 'El email introducido no es valido.';
        }

        return null;

    }

    static isValidName({value}:{value:string}){
        if(!value){
            return 'Debe introducir el nombre';
        }
        
        if(value.length < 3 || value.length > 60){
            return 'El nombre debe contener al menos 3 caracteres y como maximo 60';
        }

        return null;
    }

    
}