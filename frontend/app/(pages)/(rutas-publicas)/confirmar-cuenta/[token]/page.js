"use client"
import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import clienteAxios from "@/app/config/clienteAxios"
import Alerta from "@/app/components/Alerta"

const Confirmar = () => {

  const [alerta, setAlerta] = useState({})
  const [cuentaConfirmada, setCuentaConfirmada] = useState(false)

  const params = useParams()
  const { token } = params

  useEffect(() =>{

    const confirmarCuenta = async () => {

      try {
        const url = `/usuarios/confirmar/${token}`
        const { data } = await clienteAxios(url)

        setAlerta({
          msg: data.msg,
          error: false
        })
        setCuentaConfirmada(true)

      } catch (error) {
        setAlerta({
          msg: error.response.data.msg,
          error: true
        })
      }

    }
    confirmarCuenta()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  const { msg } = alerta
    return (
      <>
        <h1 className='text-sky-600 font-black text-6xl'>Confirmar la cuenta</h1>

        <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
          {msg && <Alerta alerta={alerta} /> }

          {cuentaConfirmada && (
            <Link 
            href="/"
            className=" block text-center my-5 text-slate-500 uppercase text-sm"
          
            > Iniciar sesión</Link>
          )}
        </div>
      </>
    )
  }
  
  export default Confirmar