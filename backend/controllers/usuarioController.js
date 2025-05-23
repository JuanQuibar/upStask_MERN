import Usuario from "../models/Usuario.js"
import generarId from "../helpers/generarId.js";
import generarJWT from "../helpers/generarJWT.js";
import {emailRegistro, emailOlvidePassword} from "../helpers/email.js"

const registrar = async (req, res) => {
    //evitar registros duplicados
    const { email } = req.body;
    const existeUsuario = await Usuario.findOne({email:email});
    
    if(existeUsuario){
        const error = new Error("Usuario ya registrado");
        return res.status(400).json({msg: error.message})
    }

    try {
        const usuario = new Usuario(req.body);
        usuario.token = generarId(); //token de un solo uso que se usará como param en la url que se enviará al usuario por mail
        await usuario.save();

        //Enviar correo de confirmación
        emailRegistro({
            email: usuario.email, 
            nombre: usuario.nombre,
            token: usuario.token
        })

        res.json({msg: 'Revisá tu correo para confirmar la cuenta'});
        
    } catch (error) {
        console.log(error);
    }

};


const confirmar = async (req, res) => {
    const { token } = req.params;
    const usuarioConfirmar = await Usuario.findOne({token});

    if(!usuarioConfirmar){
        const error = new Error("Token no válido");
        return res.status(403).json({msg: error.message});
    }

    try {
        usuarioConfirmar.confirmado = true;
        usuarioConfirmar.token = '';
        await usuarioConfirmar.save();
        res.json({msg: "Usuario confirmado correctamente"});
    } catch (error) {
        console.log(error)
    };
};

const autenticar = async (req, res) =>{
    const { email, password} = req.body; 

    //comprobar si el usuario existe
    const usuario = await Usuario.findOne({email:email});
    if(!usuario){
        const error = new Error("El usuario no existe");
        return res.status(404).json({msg: error.message});
    };
    //comprobar si el usuario esta confirmado
    if(!usuario.confirmado){
        const error = new Error("Tu cuenta no ha sido confirmada");
        return res.status(403).json({msg: error.message});
    };

    //comprobar su password
    if(await usuario.comprobarPassword(password)){
        res.json({
            _id: usuario._id,
            nombre: usuario.nombre,
            email: usuario.email,
            token: generarJWT(usuario._id) // este token es solo para la res.json. No va a la DB
        })
    } else {
        const error = new Error("La contraseña es incorrecta");
        return res.status(403).json({msg: error.message});
    };

};

const olvidePassword = async (req, res) =>{
    const { email } = req.body;
    const usuario = await Usuario.findOne({email:email});
    if(!usuario){
        const error = new Error("El usuario no existe");
        return res.status(404).json({msg: error.message});
    };

    try {
        usuario.token = generarId();// dado que era un usuario confirmado, se le había borrado el token con la funcion confirmar
        await usuario.save();

        //Enviar el email
        emailOlvidePassword({
            email: usuario.email, 
            nombre: usuario.nombre,
            token: usuario.token
        });

        res.json({ msg: 'Hemos enviado un correo con las instrucciones' });
        
    } catch (error) {
        console.log(error)
    };
};

const comprobarToken = async (req, res) =>{
    const { token } = req.params;
    const tokenValido = await Usuario.findOne({ token });
    if(tokenValido){
        res.json({ msg: "Token válido y el usuario existe"})
    } else{
        const error = new Error("Token no valido");
        return res.status(404).json({msg: error.message});
    };
};

const nuevoPassword = async (req, res) =>{
 
    const { token } = req.params;
    const { password } = req.body;

    const usuario = await Usuario.findOne({ token });
    if(usuario){
        usuario.password = password;
        usuario.token = '';
        try {
            await usuario.save();
            res.json({ msg: "Contraseña cambiada"});    
        } catch (error) {
            console.log(error);   
        }
        
    } else{
        const error = new Error("Token no valido");
        return res.status(404).json({msg: error.message});
    };

}

const perfil = async (req, res) =>{

    const { usuario } = req; //el dato del req viene de middleware anterior declarado en el router
    res.json(usuario)


}

export { registrar, confirmar, autenticar, olvidePassword, comprobarToken, nuevoPassword, perfil}