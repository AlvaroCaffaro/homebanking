import poolPostreSQL from "../connection";
import { PostgreInformationUser } from "../persistence/model/PostgreInformation";
import { InformationUser } from "./service/Information";
import { IinformationUser } from "../persistence/interfaces/interfacesInformation";

const databaseInformation:IinformationUser = new PostgreInformationUser(poolPostreSQL);
export const Information = new InformationUser(databaseInformation);