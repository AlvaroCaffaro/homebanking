import { Authenticate } from "./service/Authenticate";
import { PostreSQLAuth } from "../persistence/model/PostgreAuth";
import poolPostreSQL from "../connection";
import { PostgreInformationUser } from "../persistence/model/PostgreInformation";
import { InformationUser } from "./service/Information";
import { IinformationUser } from "../persistence/interfaces/interfacesInformation";

/// posibilidad de cambiar de modelo dinamicamente, por ejemplo si existiria: 
//import { JsonAuth } from "../PERSISTENCE/model/JsonAuth";

const databaseAuth = new PostreSQLAuth(poolPostreSQL);
export const Auth = new Authenticate(databaseAuth);

const databaseInformation:IinformationUser = new PostgreInformationUser(poolPostreSQL);
export const Information = new InformationUser(databaseInformation);