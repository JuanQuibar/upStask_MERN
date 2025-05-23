import jwt from "jsonwebtoken"

const generarJWT = (id) =>{

    //el id lo recibe del controller y lo pasa como PAYLOAD a jwt
    return jwt.sign( { id }, process.env.JWT_SECRET, {
        expiresIn:"30d",
    })

}

export default generarJWT