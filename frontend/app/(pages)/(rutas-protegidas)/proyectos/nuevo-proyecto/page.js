import FormularioProyecto from "@/app/components/FormularioProyecto"

const NuevoProyecto = () => {
  return (
    <>
      <h1 className="text-4xl font-black">Crear proyectos</h1>

      <div className="mt-10 flex justify-center">
        <FormularioProyecto /> 
      </div>
    </>
  )
}

export default NuevoProyecto