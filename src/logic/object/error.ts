
const ErrorName ={
    'ConnectionError':'Ha ocurrido un error al conectarse a la base de datos.',
    'DatabaseError':'Ha ocurrido un error al interactuar la base de datos.',
    'NotEnoughBalanceError':'No posee fondos suficiente para realizar esta transferencia',
    'MaxTryError':'Ya superaste el limite de intentos, pruebe mas tarde.',
    'IncorrectDataError':'Los datos ingresados son incorrectos.',
    'EmailSendFailureError':'Ha ocurrido un error al enviar el email',
    'RegisteredUserError':'El dni o el usuario ya han sido utilizados',

}



export class ConnectionError extends Error{
    constructor(){
        super(ErrorName['ConnectionError']);
        this.name = 'ConnectionError';
    }

}


export class DatabaseError extends Error{
    constructor(){
        super(ErrorName['DatabaseError']);
        this.name = 'DatabaseError';

    }

}

export class NotEnoughBalanceError extends Error {
    constructor() {
      super(ErrorName['NotEnoughBalanceError']);
      this.name = 'NotEnoughBalanceError';
    }
  }

export class RepeatedValueError extends Error{
    constructor(message:string){
        super(message);
        this.name = 'RepeatedValueError'
    }
}

export class MaxTryError extends Error{
    constructor(){
        super(ErrorName['MaxTryError']);
        this.name = 'MaxTryError';

    }
}

export class IncorrectDataError extends Error{
    constructor(){
        super(ErrorName['IncorrectDataError']);
        this.name = 'IncorrectDataError';

    }
}


export class EmailSendFailureError extends Error{
    constructor(){
        super(ErrorName['EmailSendFailureError']);
        this.name = 'EmailSendFailureError';
    }
}

export class RegisteredUserError extends Error{
    constructor(){
        super(ErrorName['RegisteredUserError']);
        this.name = 'RegisteredUserError';
    }
}