import { Authenticate } from "./service/Authenticate";
import { PostreSQLAuth } from "../persistence/model/PostgreAuth";
import poolPostreSQL from "../connection";



const databaseAuth = new PostreSQLAuth(poolPostreSQL);
export const Auth = new Authenticate(databaseAuth);

