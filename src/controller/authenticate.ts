import {Auth} from '../logic/dependenciesAuth';
import jwt from 'jsonwebtoken';

import {FormValidator} from '../validation/formValidation'
import { Holder } from '../logic/object/user';
import { EnvCofig } from '../env.config';
import { generateAlias } from '../utils/generateAlias';
//import { Mailer } from '../LOGIC/service/Mailer';

export class AuthenticateController{
    static async login(req:any,res:any){
        res.send({'value ':generateAlias()});
    };
    
    static async match(req:any,res:any){
        const {username, password} = req.body;

        let error:string[] = [];
        let message;

        message = FormValidator.isValidName({value: username});
        if(message != null){ error.push(message);}

        message = FormValidator.isValidPassword({value: password});
        if(message != null){ error.push(message);}

        if(error.length > 0){
            return res.send({'error': error});
        }

        const result = await Auth.match({username,password});
        if(result instanceof Error){
            return res.send({'error': result.message});
        }

        try {
            const user:Holder = result as Holder;

            const token = jwt.sign(
                    {
                        id:user.get_id(),
                        name:user.get_username(),
                        email:user.get_email()

                    },
                        EnvCofig.secret_key, 

                        {
                            expiresIn:60*60*60*24*10 // 10 days
                        }
                    );

                    return (res.json({
                        'token': token
                    }));

        
        } catch (err) {
        
            return res.json({
                message:[(err as Error).message] ,//['Ha ocurrido un error al conectarse al servidor'],
                result: 'failure',
                data:null
            });
        }
    };


    static async create(req:any,res:any){
        const {email,username,password,dni,name,secondname,lastname} = req.body;
        
        let error:string[] = [];
        let message;
        message = FormValidator.isValidEmail({value:email});
        if(message != null){ error.push(message);}

        message= FormValidator.isValidPassword({value:password});
        if(message != null){ error.push(message);}

        message= FormValidator.isValidName({value:name});
        if(message != null){ error.push(message);}

        message= FormValidator.isValidName({value:lastname});
        if(message != null){ error.push(message);}


        if(error.length > 0){
            return res.json({
                message:error,
                result: 'failure',
                data:null
            });
        }

        const result = await Auth.register({email,username,password,person:{
            dni,name,secondname,lastname
        }});
        
        if(result instanceof Error){
        
            return res.json({
                message:[result.message],
                result: 'failure',
                data:null
            });

        }

        return res.json({
            message:['Se ha creado el correctamente el usuario. En los proximos dias su cuenta será validada'],
            result: 'success',
            data:null
        });

        // res.send({'success':'se ha creado el usuario'});

        /*const mailer = Mailer.get_instance();

        const response = await mailer.sendMail({name,email},{type:'register'});

        if(response instanceof Error){
            return res.render('login.ejs',{
                created:true,
                error:[response.message],
            });
        }

        return res.render('login.ejs',{
            created:true,
            error:[]
        });

       */
    }



}