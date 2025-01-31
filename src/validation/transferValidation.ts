export class TransferValidation {
    static isValidAmount({value}:{value:any}){
        if(typeof value  == 'string'){
            value = Number(value);
            if(Number.isNaN(value)){
                return false;
            }

            if(value > 0){
                return true;
            }
            return false;
        }

        return false;
    }

    static isValidAlias({value}:{value:string}){
        if(typeof value  != 'string'){
            return false;
        }

        let pos = value.indexOf('.');;
        let count = 0;
        while(pos != -1){

            count++;

            if(count == 3){
                return true;
            }


            pos = value.indexOf('.',pos + 1);
        }
      

        return false;
        

    }    

}