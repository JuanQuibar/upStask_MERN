"use client"
import Link from "next/link"

const Sidebar = ({nombre}) => {

  return (

    <aside className="md:w-80 lg:w-96 px-5 py-10">

      <p className="text-xl font-bold"> Hola {nombre} </p>

      <Link
        href='proyectos/nuevo-proyecto'
        className="bg-sky-600 w-full p-3 text-white uppercase font-bold block mt-5 text-center rounded-lg"
      > Nuevo Proyecto</Link>

    </aside>
  )
}

export default Sidebar