import express,{Application,Request,Response} from 'express';
import path from 'path';
import {authRouter} from  './router/authenticateRouter';
import cookieParser from "cookie-parser";
import jwt from 'jsonwebtoken';
import { EnvCofig } from './env.config';
import { userRouter } from './router/userRouter';
import { accountRouter } from './router/accountRouter';
import { transferRouter } from './router/transferRouter';
import session from 'express-session';



const app:Application = express();
//configuramos el motor de plantillas y la carpeta donde van a estar las vistas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'view'));

// esto permite que javaScript asigne todas las variables del archivo .env en process.env
process.loadEnvFile();



// middlewares
app.use(session({
    // store: a futuro lo podriamos cambiar una mongoDb o una redis
    secret: EnvCofig.session_secret, 
    resave: false,      
    saveUninitialized: true, 
    cookie: { 
        secure: true, 
        httpOnly: true, 
        domain: `http://localhost:${EnvCofig.port}/ `
    }  
}));

app.use(express.json());  // Para solicitudes con JSON
// este middleware procesa los datos enviados en una solicitud post. permitiendolos utilizar req.body para acceder a los datos que nos envian desde el formulario de inicio de sesion
app.use(express.urlencoded({ extended: true }));

// este middleware nos sirve las cookies en req.cookies para que podamos acceder a ellas desde la request
app.use(cookieParser());

// configuramos los archivos estaticos en la carpeta public (aqui estaran los archivos css) 
app.use(express.static(path.join(__dirname, 'public')));

/*
app.use((req:any,res:Response,next:any)=>{
    if(!req.cookie.lenguage){
        req.cookie.lenguage = 'spanish';
    }
    next();
});

*/


/*
app.use((req:any,res:Response,next:any) => {
    
    req.session = {user:null};
    const token = req.cookies.access_token;

    if(!token){
        return next();
    }

    try{
        // verificamos si el token que se encontraba en la cookie es valido. En caso que no lo sea lanzaria un error sino iniciamos la sesion
        const data = jwt.verify(token,process.env.SECRET_KEY as string);
        req.session.user = data;
        next();

    } catch(e){
        next();
    }


});
*/



app.use('/',authRouter);

app.use('/:token',(req:any,res:any,next)=>{
    const token = req.params.token;

    if(!token){
        return res.status(403).json({
            message:['usuario no verificado.token no previsto'],
            status:'failure',
            data:null
        });
    }

    try {
        const data = jwt.verify(token,EnvCofig.secret_key);
        req.session.user = data;
        next();

    } catch (e) {
        res.status(403).json({
            message:[(e as Error).message],
            status:'failure',
            data:null
        });
    }

});


//protected routes (only registered users)
/*
app.use('/:token',(req:any,res:any)=>{
    const {user} = req.session;
    res.send({user:user});
});
*/

app.use('/:token',userRouter);

app.use('/:token/:accountToken',(req:any,res:any,next:any)=>{
        try {
            const { accountToken } = req.params;
            const decode = jwt.verify(accountToken,EnvCofig.other_secret);
            req.session.account = decode;
            next();

            
        } catch (e) {
            return res.status(403).json({
                message:['cuenta no valida'],
                error: 'failure',
                data:null
            });
        }
});


app.use('/:token/:accountToken',accountRouter);
app.use('/:token/:accountToken/transfer',transferRouter);

/*app.use('/*',(_:any,res:any)=>{
    res.send('ruta no existente');
});*/


const PORT = (Number(process.env.PORT));
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});


// event 
process.on('uncaughtException', (err) => {
    console.error('Excepción no controlada:', err);
});

process.on('unhandledRejection', (reason) => {
    console.error('Rechazo no manejado:', reason);
});
