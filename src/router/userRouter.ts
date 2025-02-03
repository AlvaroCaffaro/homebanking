import {Router} from  'express';
import {UserController} from '../controller/user';

export const userRouter = Router();

userRouter.get('/info',UserController.get_personalInformation);  // Cannot read properties of undefined (reading 'id')
userRouter.get('/user',UserController.get_userInformation); // check
userRouter.get('/',UserController.get_personalAccounts);  // check
userRouter.post('/account',UserController.create_account); // check
userRouter.patch('/updatePassword',UserController.update_password); // check
userRouter.patch('/updateUsername',UserController.update_username); // Illegal arguments: undefined, string
