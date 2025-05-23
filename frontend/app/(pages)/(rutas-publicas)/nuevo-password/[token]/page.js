"use client"
import { useEffect, useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import clienteAxios from "@/app/config/clienteAxios"
import Alerta from "@/app/components/Alerta"

const NuevoPassword = () => {

  const [password, setPassword] = useState('')
  const [tokenValido, setTokenValido] = useState(false)
  const [alerta, setAlerta] = useState({})
  const [reglaPassword, setReglaPassword] = useState(false)
  const [passwordModificado, setPasswordModificado] = useState(false)

  const params = useParams()
  const { token } = params

    useEffect(() => {
      const comprobarToken = async () =>{

        try {
          
          const { data } = await  clienteAxios.get(`/usuarios/olvide-password/${token}`)

          setTokenValido(true)
          
        } catch (error) {
          setAlerta({
            msg: error.response.data.msg,
            error: true
          })
        }
      }

      comprobarToken()

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleSubmit = async e => {
      e.preventDefault()
      setReglaPassword(false)

      if (!/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/.test(password)) {
        setReglaPassword(true)
        return
      }

      try {

        const { data } = await clienteAxios.post(`/usuarios/olvide-password/${token}`, {password} )

        setAlerta({
          msg: data.msg,
          error: false
        })
        
        setPasswordModificado(true)
        
      } catch (error) {
        setAlerta({
          msg: error.response.data.msg,
          error: true
        })   
      }
    }

    const { msg } = alerta

    return (
      <>
        <h1 className='text-sky-600 font-black text-6xl'>Restablecer contraseña</h1>

        {msg && <Alerta alerta={alerta} />}
      

        {tokenValido && !passwordModificado ? (
          <form 
            className= 'my-10 bg-white shadow rounded-lg p-10'
            //className='my-10 bg-white shadow rounded-lg p-10 '
            onSubmit={handleSubmit}
          >

            <div className='my-5'>

              <label htmlFor='password' className='uppercase text-gray-400 blok text-xl block font-bold'> Nueva contraseña </label>
              <input 
                type="password"
                placeholder='Ingrese una contraseña' 
                className='w-full mt-3 p-3 border rounded-xl bg-gray-50'
                id='password'
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
              {reglaPassword && (
						    <p className= 'border, border-red-500 border-2 p-1 text-[10px] mt-2 text-gray-500'>La contraseña debe tener entre 8 y 16 caracteres, al menos un dígito, al menos una minúscula y al menos una mayúscula. No puede tener otros símbolos</p>
					    )}

            </div>

          
            <input 
              type="submit" 
              value="Guardar"
              className='bg-sky-700 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors'
            />

          </form>) :(
          <Link 
            href="/"
            className=" block text-center my-5 text-slate-500 uppercase text-sm"
          
            > Iniciar sesión</Link>
        )}

      </>
    )
  }
  
  export default NuevoPassword

 