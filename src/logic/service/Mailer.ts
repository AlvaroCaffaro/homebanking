/*import {createTransport} from 'nodemailer';
import { EmailSendFailureError } from  '../object/error';

export class Mailer{

    private static instance:Mailer|null = null;
    private Transporter;
    private constructor(){
        this.Transporter = createTransport({
            service:'gmail',
            port:process.env.GMAIL_PORT,
            secure:true,
            auth:{
                user: process.env.GMAIL_EMAIL,
                pass: process.env.GMAIL_PASSWORD,
            }

        });

    }

    private get_message_register({name}:{name:string}){
        return({
            subject:'Bienvenido/a',
            html: `<h1> Bienvenido ${name}, su cuenta ha sido registrada correctamente.</h1>`
        });
    }


    static get_instance(){
        if(Mailer.instance == null){
            Mailer.instance = new Mailer();
        }

        return Mailer.instance;
    }

    public async sendMail({name,email}:{name:string,email:string},{type}:{type:string}){

        const data = (type === 'register')? this.get_message_register({name}): {subject:'algun otro',html:'<h1>algun otro a futuro</h1>'};



        const gmailOptions ={ 
            from:process.env.GMAIL_EMAIL,
            to:email,
            subject: data.subject,
            html:data.html,

        }


        try {
            const info = await this.Transporter.sendMail(gmailOptions);
            return info;
            
        } catch (e) {
            return new EmailSendFailureError();
        }

        
    }

}


*/