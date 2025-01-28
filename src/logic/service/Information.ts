import { IinformationUser } from "../../persistence/interfaces/interfacesInformation";

export class Information implements IinformationUser{
    private persistence:IinformationUser
    constructor(persistence:IinformationUser){
        this.persistence = persistence;
    }
}
