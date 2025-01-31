import { Authenticate } from "./service/Authenticate";
import { PostreSQLAuth } from "../persistence/model/PostgreAuth";
import poolPostreSQL from "../connection";


/// posibilidad de cambiar de modelo dinamicamente, por ejemplo si existiria: 
//import { JsonAuth } from "../PERSISTENCE/model/JsonAuth";

const databaseAuth = new PostreSQLAuth(poolPostreSQL);
export const Auth = new Authenticate(databaseAuth);

