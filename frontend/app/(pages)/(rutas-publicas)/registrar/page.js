"use client"
import { useState } from "react"
import Link from "next/link"
import clienteAxios from "../../../config/clienteAxios"
import Alerta from "../../../components/Alerta"

const Registrar = () => {

	const [nombre, setNombre] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [repetirPassword, setRepetirPassword] = useState('')
	const [alerta, setAlerta] = useState({})
	const [reglaPassword, setReglaPassword] = useState(false)

	const handleSubmit = async e => {
		e.preventDefault();
		setReglaPassword(false)
		 
		if([nombre, email, password, repetirPassword].includes('')){
			setAlerta({
				msg: 'Todos los campos son obligatorios',
				error: true
				
			})
			return
		}
		

		if (!/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/.test(password)) {
			setReglaPassword(true)
			return
		}

		if(password !== repetirPassword) {
			setAlerta({
				msg: 'Las contraseñas no son iguales',
				error: true
			})
			return
		}

		setAlerta({})
		
		//ATENCIÓN: LAS VARIABLES DE ENTORNO DEBEN TIPEARSE A MANO CON EL SERVIDOR APAGADO. NO COPIAR Y PEGAR
		try {
			
			const { data } = await clienteAxios.post('/usuarios', {nombre, email, password})
		
			setAlerta({
				msg: data.msg,
				error: false
			}) 


			/* setNombre('')
			setEmail('')
			setPassword('')
			setRepetirPassword('') */
			
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
			<h1 className='text-sky-600 font-black text-6xl'>Registrarse</h1>

			{msg && <Alerta alerta={alerta} />}

			<form 
				className='my-10 bg-white shadow rounded-lg p-10 '
				onSubmit={handleSubmit}
			>

				<div className='my-5'>

					<label htmlFor='nombre' className='uppercase text-gray-400 blok text-xl block font-bold'> Nombre </label>
					<input 
						type="text"
						placeholder='Nombre de usuario' 
						className='w-full mt-3 p-3 border rounded-xl bg-gray-50'
						id='nombre'
						value={nombre}
						onChange={e => setNombre(e.target.value)}
						
					/>

				</div>

				<div className='my-5'>

					<label htmlFor='email' className='uppercase text-gray-400 blok text-xl block font-bold'> Correo </label>
					<input 
						type="email"
						placeholder='Ingrese un correo' 
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
						placeholder='Ingrese una contraseña' 
						className='w-full mt-3 p-3 border rounded-xl bg-gray-50'
						id='password'
						value={password}
						onChange={ e => setPassword(e.target.value)}
					/>
					
					{reglaPassword && (
						<p className= 'border, border-red-500 border-2 p-1 text-[10px] mt-2 text-gray-500'>La contraseña debe tener entre 8 y 16 caracteres, al menos un dígito, al menos una minúscula y al menos una mayúscula. No puede tener otros símbolos</p>
					)}
					{/* <p className={`${reglaPassword && 'border, border-red-500 border-2 p-1'} text-[10px] mt-2 text-gray-500` }>La contraseña debe tener entre 8 y 16 caracteres, al menos un dígito, al menos una minúscula y al menos una mayúscula. No puede tener otros símbolos</p> */}

				</div>

				<div className='my-5'>

					<label htmlFor='password2' className='uppercase text-gray-400 blok text-xl block font-bold'> Repetir contraseña </label>
					<input 
						type="password"
						placeholder='Repetir a contraseña' 
						className='w-full mt-3 p-3 border rounded-xl bg-gray-50'
						id='password2'
						value={repetirPassword}
						onChange={e => setRepetirPassword(e.target.value)}
					/>

				</div>

				<input 
					type="submit" 
					value="Crear cuenta"
					className='bg-sky-700 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors'
				/>

			</form>

			<nav className="lg:flex lg:justify-between">

				<Link 
					href="/"
					className=" block text-center my-5 text-slate-500 uppercase text-sm"
				
				> Iniciar sesión</Link>

				<Link 
					href="/olvide-password"
					className=" block text-center my-5 text-slate-500 uppercase text-sm"
				
				> Olvidé mi contraseña</Link>

			</nav>
		</>
	)
}

export default Registrar