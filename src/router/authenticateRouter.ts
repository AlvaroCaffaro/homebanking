import {Router} from  'express';
import {AuthenticateController} from '../controller/authenticate';

export const authRouter = Router();

authRouter.get('/login',AuthenticateController.login);
authRouter.post('/login', AuthenticateController.match);
authRouter.get('/register',AuthenticateController.register);
authRouter.post('/register',AuthenticateController.create);

authRouter.get('/logout',AuthenticateController.logout);