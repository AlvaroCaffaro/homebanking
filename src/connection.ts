import { Pool, PoolConfig} from 'pg';
// Función para crear una conexión a la base de datos
import { EnvCofig } from './env.config'; 

const poolConfig:PoolConfig = {
    port: EnvCofig.port_database,
    user: EnvCofig.user_database,
    password: EnvCofig.password_database,
    database:EnvCofig.database,
    host:EnvCofig.host
}

const poolPostreSQL:Pool = new Pool(poolConfig);

poolPostreSQL.on('error',(err:any,client:any)=>{
    console.log('error: ', err.message);
})

poolPostreSQL.on('connect',(client)=>{
    console.log('cliente Connectado: ');
})

poolPostreSQL.on('release',(err,client)=>{
    if(err){ 
        console.log(err);
        return;
    }
    
    console.log('cliente desconectado');
})


export default poolPostreSQL;

