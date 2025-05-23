import jwt from "jsonwebtoken"
import Usuario from "../models/Usuario.js";

const checkAuth = async (req, res, next) =>{

    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){

        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.usuario = await Usuario.findById(decoded.id).select("nombre email");//en el select también se pueden excluir campos poniendo el signo - (menos) antes. Por ejemplo .select("-password")
            return next()
            
        } catch (error) {
            return res.status(404).json({ msg: "Hubo un error"});

        }

    }

    if(!token){
        const error = new Error('Token no válido');
        return res.status(401).json({msg: error.message })
    }

    next(); 

}

export default checkAuth;