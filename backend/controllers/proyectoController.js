import mongoose from "mongoose";
import Proyecto from "../models/Proyecto.js";
import Tarea from "../models/Tarea.js";

//ver cómo implementar
const permisoProyecto = async (req, res) =>{
    const { id } = req.params;

    const valid = mongoose.Types.ObjectId.isValid(id);
    if(!valid) {
        const error = new Error("El proyecto no existe")
        return res.status(404).json({msg: error.message})
    }

    try {
        const proyecto = await Proyecto.findById(id.trim());
        if(!proyecto){
            res.status(404).json({msg: "No encontrado"})
        };

        //verifica que el proyecto seleccionado pertenezca al id del usuario que inició sesión o sea colaborador.
        if(proyecto.creador.toString() !== req.usuario._id.toString()) {
            return res.status(401).json({msg: "No autorizado"})
        }
        return id
        
    } catch (error) {
        res.status(404).json({msg: "Id de proyecto no válido", error})
        
    };
    
};


const obtenerProyectos = async (req, res) =>{
    const proyectos = await Proyecto.find().where("creador").equals(req.usuario);
    res.json(proyectos)
};

const nuevoProyecto = async (req, res) =>{
    const proyecto = new Proyecto(req.body);
    proyecto.creador = req.usuario._id

    try {
        const proyectoAlmacenado = await proyecto.save();
        res.json(proyectoAlmacenado)
    } catch (error) {
        console.log(error)
    };

};

const obtenerProyecto = async (req, res) =>{
    const { id } = req.params;

    const valid = mongoose.Types.ObjectId.isValid(id);
    if(!valid) {
        const error = new Error("El proyecto no existe")
        return res.status(404).json({msg: error.message})
    }

    try {
        const proyecto = await Proyecto.findById(id.trim());
        if(!proyecto){
            res.status(404).json({msg: "No encontrado"});
        };

        //verifica que el proyecto seleccionado pertenezca al id del usuario que inició sesión o sea colaborador.
        if(proyecto.creador.toString() !== req.usuario._id.toString()) {
            return res.status(401).json({msg: "No autorizado"})
        };
       
        const tareas = await Tarea.find().where('proyecto').equals(proyecto._id);
        
        res.json({
            proyecto,
            tareas
            
        })
        
    } catch (error) {
        res.status(404).json({msg: "Id de proyecto no válido", error})
        
    };
    
};

const editarProyecto = async (req, res) =>{

    const { id } = req.params;

    const valid = mongoose.Types.ObjectId.isValid(id);
    if(!valid) {
        const error = new Error("El proyecto no existe")
        return res.status(404).json({msg: error.message})
    }

    try {
        const proyecto = await Proyecto.findById(id);
        if(!proyecto){
            res.status(404).json({msg: "No encontrado"})
        };

        //verifica que el proyecto seleccionado pertenezca al id del usuario que inició sesión o sea colaborador.
        if(proyecto.creador.toString() !== req.usuario._id.toString()) {
            return res.status(401).json({msg: "No autorizado"})
        }

        //ESTA ES EL CÓDIGO DEL JUAN DE LA TORRE
        /* proyecto.nombre = req.body.nombre || proyecto.nombre;
        proyecto.cliente = req.body.cliente || proyecto.cliente;
        proyecto.descripcion = req.body.descripcion || proyecto.descripcion;
        proyecto.fechaEntrega = req.body.fechaEntrega || proyecto.fechaEntrega;

        const proyectoAmacenado = await proyecto.save() */

        //ESTE ES EL CÓDIGO MÁS SIMPLE DE UN COLABORADOR
        const proyectoActualizar = await Proyecto.findByIdAndUpdate(id, req.body, { new: true });
        
        res.json(proyectoActualizar)

        
    } catch (error) {
        res.status(404).json({msg: "Id de proyecto no válido", error})
        
    };

    

};

const eliminarProyecto = async (req, res) =>{

    const { id } = req.params;

    const valid = mongoose.Types.ObjectId.isValid(id);
    if(!valid) {
        const error = new Error("El proyecto no existe")
        return res.status(404).json({msg: error.message})
    }

    try {
        const proyecto = await Proyecto.findById(id.trim());
        if(!proyecto){
            res.status(404).json({msg: "No encontrado"})
        };

        if(proyecto.creador.toString() !== req.usuario._id.toString()) {
            return res.status(401).json({msg: "No autorizado"})
        }

        await proyecto.deleteOne()
        res.json({msg: "Proyecto eliminado"})
        
    } catch (error) {
        res.status(404).json({msg: "Algo salió mal", error})
        
    };

};

const agregarColaborador = async (req, res) =>{

};

const eliminarColaborador = async (req, res) =>{

};

export {
    obtenerProyectos,
    nuevoProyecto,
    obtenerProyecto,
    editarProyecto,
    eliminarProyecto,
    agregarColaborador,
    eliminarColaborador
}