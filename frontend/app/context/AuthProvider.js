/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import { createContext, useState, useEffect } from "react";
import clienteAxios from "../config/clienteAxios";
import { useRouter } from 'next/navigation'
// redirect es del lado del servidor, mietras que useRouter (push o replace) es del lado del cliente


const AuthContext = createContext();

const AuthProvider = ({ children}) => {

    const router = useRouter()

    const [auth, setAuth] = useState({})
     
    //Esperar la respuesta de la DB en usuarios/perfil. Se aplica en el layout de las rutas protegidas (proyectos) y en la pagina del login
    const [cargando, setCargando] = useState(true) 

    useEffect(() =>{

        const autenticarUsuario = async () =>{

            const token = localStorage.getItem('token')

            if(!token) {
                setCargando(false)
                return
            }

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }  

            try {
                const { data } = await clienteAxios('usuarios/perfil', config)
                setAuth(data)
                router.replace('/proyectos/') || router.replace('proyectos/nuevo-proyecto')

            } catch (error) {
                setAuth({})

            } finally{
                setCargando(false)
            }
        }
        
        autenticarUsuario()

    }, [])

    return (

        <AuthContext.Provider
            value={{
                auth,
                setAuth,
                cargando
            }}
        > 
            {children}
        </AuthContext.Provider>
    )

}

export {
    AuthProvider
}

export default AuthContext;