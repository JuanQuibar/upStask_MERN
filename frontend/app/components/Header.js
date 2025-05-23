import Link from "next/link"

const Header = () => {
  return (
    <header className='px-4 py-5 bg-white border-b'>

      <div className="md:flex md:justify-between">

        <h2 className='text-4xl text-sky-600 font-black'>
          UpTask
        </h2>

        <input 
          type="search" 
          placeholder='Buscar proyecto'
          className='mt-4 md:mt-0 rounded-lg lg:w-96 block p-2 border'
        />

        <div className="mt-4 md:mt-0 flex items-center gap-4">

          <Link
            href='/proyectos'
            className="font-bold uppercase"
          > Proyectos</Link>

          <button
            type="button"
            className="text-white text-sm bg-sky-600 p-3 rounded-md uppercase font-bold"
          >Cerrar sesión</button>

        </div>

        


      </div>

    </header>
  )
}

export default Header