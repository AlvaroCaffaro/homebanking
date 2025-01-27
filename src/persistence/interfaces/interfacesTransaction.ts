import { Transaction} from "../../LOGIC/object/transaction";

export interface Ioperations{
    [x: string]: any;

    getOperations(idAccount:bigint,from:Date,to:Date):Promise<Transaction[]>
    getAllOperation(idAccount:bigint):Promise<Transaction[]>;

}