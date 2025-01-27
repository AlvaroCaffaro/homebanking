import Pool from 'pg-pool';
import {config} from './index';
import { Client } from 'pg';
// Función para crear una conexión a la base de datos

const poolPostreSQL:Pool<Client> = new Pool(config);

poolPostreSQL.on('error',(err:any,client:any)=>{
    console.log('error: ', err.message);
})

export default poolPostreSQL;

