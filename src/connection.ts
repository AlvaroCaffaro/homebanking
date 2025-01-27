import Pool from 'pg-pool';
import {config} from './index';
// Función para crear una conexión a la base de datos

const pool = new Pool(config);

pool.on('error',(err:any,client:any)=>{
    console.log('error: ', err.message);
})


export const  createPostgreConnection= async (): Promise<any> => {
    
    return pool.connect();
    
};