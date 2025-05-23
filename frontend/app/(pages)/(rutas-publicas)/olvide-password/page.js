"use client"
import { useState } from "react"
import Link from "next/link"
import Alerta from "@/app/components/Alerta"
import clienteAxios from "@/app/config/clienteAxios"

const OlvidePassword = () => {

	const [email, setEmail] = useState('')
	const [alerta, setAlerta] = useState({})
	
	const handleSubmit = async e => {
		e.preventDefault()

		if(email === ''){
			setAlerta({
				msg: 'Colocá tu correo de registro pararecuperar la contraseña',
				error: true
			})
			return
		}

		try {
		
			const { data } = await clienteAxios.post('/usuarios/olvide-password', {email})

			setAlerta({
				msg: data.msg,
				error: false
			})
			
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
		<h1 className='text-sky-600 font-black text-6xl'>Recuperar contraseña</h1>


		{msg && <Alerta alerta={alerta} />}

		<form 
			className='my-10 bg-white shadow rounded-lg p-10'
			onSubmit={handleSubmit}
		>

			<div className='my-5'>

				<label htmlFor='email' className='uppercase text-gray-400 blok text-xl block font-bold'> Correo </label>
				<input 
					type="email"
					placeholder='Ingrese su correo de registro' 
					className='w-full mt-3 p-3 border rounded-xl bg-gray-50'
					id='email'
					value= {email}
					onChange={e => setEmail(e.target.value)}
					/>

			</div>

			

			<input 
				type="submit" 
				value="Enviar correo"
				className='bg-sky-700 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors'
			/>

		</form>

		<nav className="lg:flex lg:justify-between">

			<Link 
				href="/"
				className=" block text-center my-5 text-slate-500 uppercase text-sm"
			
			> Iniciar sesión</Link>

      <Link 
					href="/registrar"
					className=" block text-center my-5 text-slate-500 uppercase text-sm"
				
				> Registrarse</Link>

		</nav>
	</>
  )
}

export default OlvidePassword