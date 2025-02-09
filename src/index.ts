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

app.use('/*',(_:any,res:any)=>{
    res.status(404).send('ruta no existente');
});


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
