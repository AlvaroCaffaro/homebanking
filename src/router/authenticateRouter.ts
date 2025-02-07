import {Router} from  'express';
import {AuthenticateController} from '../controller/authenticate';

export const authRouter = Router();

authRouter.post('/login', AuthenticateController.match);
authRouter.post('/register',AuthenticateController.create);
