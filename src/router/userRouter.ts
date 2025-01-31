import {Router} from  'express';
import {UserController} from '../controller/user';

export const userRouter = Router();

userRouter.get('/',UserController.get_personalInformation);
userRouter.get('/user',UserController.get_userInformation);
userRouter.get('/account',UserController.get_personalAccounts);


