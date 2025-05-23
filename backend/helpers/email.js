import nodemailer from 'nodemailer';
import dotenv from "dotenv";

dotenv.config();

//ATENCIÓN. La configuración de nodemailer se hizo con el servidor de pruebas de https://mailtrap.io/. Para el proyecto real ver https://www.youtube.com/watch?v=OuYHrVMcuCU


export const emailRegistro = async (datos) => {
    const {email, nombre, token} = datos;

    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT ,
        auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
        }
    });

   //Información del email 
   const info = await transport.sendMail({
        from: '"UpTask - Administrdor de proyectos" <cuentas@upstack.com',
        to: email,
        subject: "Confirmar la cuenta",
        text: "Comprobar la cuenta de registro",
        html: `
            <p> Hola ${nombre}. Comprobá tu cuenta haciendo clic en el siguiente enlace: </p>
            <a href="${process.env.FRONTEND_URL}/confirmar-cuenta/${token}" >Clic acá para confirmar</a>
            <p>Si no creaste esta cuenta podés ignorar el mensaje</p>

        `
   })
};

export const emailOlvidePassword = async (datos) => {
    const {email, nombre, token} = datos;

    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT ,
        auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
        }
    });

   //Información del email 
   const info = await transport.sendMail({
        from: '"UpTask - Administrdor de proyectos" <cuentas@upstack.com',
        to: email,
        subject: "Restablecer contraseña",
        text: "Restablecer contraseña",
        html: `
            <p> Hola ${nombre}. Has solicitado restablecer la contraseña: </p>
            <p> Hacé clic en el siguiente link para generar una nueva contraseña </p>
            <a href="${process.env.FRONTEND_URL}/nuevo-password/${token}" >Restablecer</a>
            <p>Si pediste restablecer la contraseña podés ignorar el mensaje</p>

        `
   })
};


   