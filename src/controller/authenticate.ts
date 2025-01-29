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
        if(!FormValidator.isValidName({value: username})){
            error.push("el nombre de usuario escrito no es valido.");
        }

        if(!FormValidator.isValidPassword({value: password})){
            error.push('la contraseña escrita no es valida');
        }

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

                    return (res.JSON({
                        'token': token
                    }));

                    /*return (res.cookie(
                                'access_token',
                                token,
                                {
                                    httpOnly:true,
                                    secure:false,
                                }
                            
                    ).redirect('/'));
                    */
        
        } catch (err) {
            /*return res.render('login',{
                error: ['Ha ocurrido un error al conectarse al servidor'],
                created:false,
            });*/
            return res.send({'error': ['Ha ocurrido un error al conectarse al servidor']})
        }
    };

    static register(req:any,res:any){
       /* res.render('register.ejs',{
            error:[],
        });*/

        res.send('welcome register');

    }

    static async create(req:any,res:any){
        const {email,username,password,dni,name,secondname,lastname} = req.body;
        
        let error:string[] = [];
        if(!FormValidator.isValidEmail({value:email})){
            error.push("El email debe contener minimo 7 caracteres y '@' ");
        }

        if(!FormValidator.isValidPassword({value:password})){
            error.push('la contraseña debe tener por lo menos 5 caracteres');
        }

        if(!FormValidator.isValidName({value:name})){
            error.push('el nombre debe contener como minimo 5 caracteres');
        }


        if(error.length > 0){
           //return res.render('register',{
              //  error: error
            //});

            return res.send({'error':error});
        }

        const result = await Auth.register({email,username,password,person:{
            dni,name,secondname,lastname
        }});
        
        if(result instanceof Error){
            return res.send({'error':result.message});

           // return res.render('register',{
            //    error: [result.message]
            //});
        }

        res.send({'succed':'se ha creado el usuario'});

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

    static logout(_:any,res:any){
        res.clearCookie('access_token').redirect('/login');
    }


}