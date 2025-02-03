import {Router} from 'express';
import { AccountController } from '../controller/account';
export const accountRouter = Router();

accountRouter.post('/transfers',AccountController.get_transfers); 
accountRouter.get('/agenda',AccountController.get_accountAgenda);