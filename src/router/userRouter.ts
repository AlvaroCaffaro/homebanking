import {Router} from  'express';
import {UserController} from '../controller/user';

export const userRouter = Router();

userRouter.get('/info',UserController.get_personalInformation);
userRouter.get('/user',UserController.get_userInformation);
userRouter.get('/',UserController.get_personalAccounts);
userRouter.post('/account',UserController.create_account);
userRouter.patch('/updatePassword',UserController.update_password);
userRouter.patch('/updateUsername',UserController.update_password);