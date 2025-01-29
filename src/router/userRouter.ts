import {Router} from  'express';
import {AuthenticateController} from '../controller/authenticate';

export const userRouter = Router();

userRouter.get('/login',AuthenticateController.login);
userRouter.post('/login', AuthenticateController.match);
userRouter.get('/register',AuthenticateController.register);
userRouter.post('/register',AuthenticateController.create);
