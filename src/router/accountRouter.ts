import {Router} from 'express';
import { AccountController } from '../controller/account';
export const accountRouter = Router();

accountRouter.post('/transfers',AccountController.get_transfers); 
accountRouter.get('/lastTransfers',AccountController.get_lastTransfers)
accountRouter.patch('/updateAlias',AccountController.update_alias);
accountRouter.get('/',AccountController.get_info);