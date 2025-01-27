import { Authenticate } from "./service/Authenticate";
import {MysqlAuth} from "../persistence/model/MysqlAuth";


/// posibilidad de cambiar de modelo dinamicamente, por ejemplo si existiria: 
//import { JsonAuth } from "../PERSISTENCE/model/JsonAuth";

const database = new MysqlAuth();
export const Auth = new Authenticate(database);


