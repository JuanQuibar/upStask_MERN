"use client"
import useProyectos from "@/app/hooks/useProyectos"

const Proyectos = () => {

  const { proyectos} = useProyectos()
 
  return (
    <>
      <h1 className="text-4xl font-black "> Proyectos </h1>
        
    </>
  )
}

export default Proyectos