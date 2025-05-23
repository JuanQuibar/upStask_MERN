"use client"
import { useState } from "react"
import Link from "next/link"
import Alerta from "@/app/components/Alerta"
import clienteAxios from "@/app/config/clienteAxios"
import useAuth from "@/app/hooks/useAuth"

export default function Login() {

	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [alerta, setAlerta] = useState({})

	const { setAuth, cargando} = useAuth()

	const handleSubmit = async e => {
		e.preventDefault()

		if([email, password].includes('')) {
			setAlerta({
				msg: 'Todos los campos son obligatorios',
				error: true
			})
			return
		}

		try {
			const { data } = await clienteAxios.post('/usuarios/login', {email, password})
			setAlerta({})
			localStorage.setItem('token', data.token)
			setAuth(data)
			
		} catch (error) { 
			setAlerta({
				msg: error.response.data.msg,
				error: true
			})

			
		}
	}
	
	const { msg } = alerta

	if(cargando) return 'Cargando...'

	return (
		
		<>
		
			<h1 className='text-sky-600 font-black text-6xl'>Iniciar sesión</h1>

			{msg && <Alerta alerta={alerta} />}

			<form 
				className='my-10 bg-white shadow rounded-lg p-10 '
				onSubmit={handleSubmit}
			>

				<div className='my-5'>

					<label htmlFor='email' className='uppercase text-gray-400 blok text-xl block font-bold'> Email </label>
					<input 
						type="email"
						placeholder='Correo de registro' 
						className='w-full mt-3 p-3 border rounded-xl bg-gray-50'
						id='email'
						value={email}
						onChange={e => setEmail(e.target.value)}
					/>

				</div>

				<div className='my-5'>

					<label htmlFor='password' className='uppercase text-gray-400 blok text-xl block font-bold'> Contraseña </label>
					<input 
						type="password"
						placeholder='Ingresar contraseña' 
						className='w-full mt-3 p-3 border rounded-xl bg-gray-50'
						id='password'
						value={password}
						onChange={e => setPassword(e.target.value)}
					/>

				</div>

				<input 
					type="submit" 
					value="Iniciar sesión"
					className='bg-sky-700 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors'
				/>

			</form>

			<nav className="lg:flex lg:justify-between">

				<Link 
					href="/registrar"
					className=" block text-center my-5 text-slate-500 uppercase text-sm"
				
				> Registrarse</Link>

				<Link 
					href="/olvide-password"
					className=" block text-center my-5 text-slate-500 uppercase text-sm"
				
				> Olvidé mi contraseña</Link>

			</nav>
		</>
	)
} 
