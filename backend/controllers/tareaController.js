import mongoose from "mongoose";
import Tarea from "../models/Tarea.js";
import Proyecto from "../models/Proyecto.js"

//SOLO PUEDE AGREGAR TARES EL CREADOR DLa Tarea
const agregarTarea = async (req, res) => {
    const { proyecto } = req.body;

    const valid = mongoose.Types.ObjectId.isValid(proyecto);
    if(!valid) {
        const error = new Error("La Tarea no existe")
        return res.status(404).json({msg: error.message})
    }

    const existeProyecto = await Proyecto.findById(proyecto.trim());
    
    if(!existeProyecto) {
        const error = new Error('La Tarea no existe');
        return res.status(404).json({msg: error.message});
    }

    if(existeProyecto.creador.toString() !== req.usuario._id.toString()) {
        const error = new Error('No autorizado');
        return res.status(403).json({msg: error.message})
    }

    try {
        const tareaAlmacenada = await Tarea.create(req.body); //similar a new[Molel] usado en otros controllers
        res.json(tareaAlmacenada)
    } catch (error) {
        console.log(error)
    };

};

const obtenerTarea = async (req, res) => {
    const { id } = req.params;
    const tarea = await Tarea.findById(id).populate("proyecto"); //trae información dLa Tarea al que pertenece la tarea

    if(!tarea) {
        const error = new Error('Tarea no encontrada');
        return res.status(404).json({msg: error.message})
    }
    
    if(tarea.proyecto.creador.toString() !== req.usuario._id.toString()) {
        const error = new Error('No autorizado');
        return res.status(403).json({msg: error.message})
    }
    res.json(tarea)
};

const actualizarTarea = async (req, res) => {
    const { id } = req.params;
    const tarea = await Tarea.findById(id).populate("proyecto"); //trae información dLa Tarea al que pertenece la tarea

    if(!tarea) {
        const error = new Error('Tarea no encontrada');
        return res.status(404).json({msg: error.message});
    }
    
    if(tarea.proyecto.creador.toString() !== req.usuario._id.toString()) {
        const error = new Error('No autorizado');
        return res.status(403).json({msg: error.message});
    }

    tarea.nombre = req.body.nombre || tarea.nombre;
    tarea.descripcion = req.body.descripcion || tarea.descripcion;
    tarea.prioridad = req.body.prioridad || tarea.prioridad;
    tarea.fechaEntrega = req.body.fechaEntrega || tarea.fechaEntrega;

    try {
        const tareaAlmacenada = await tarea.save()
        res.json(tareaAlmacenada)
    } catch (error) {
        console.log(error)
    }
};

const eliminarTarea = async (req, res) => {
    const { id } = req.params;

    const valid = mongoose.Types.ObjectId.isValid(id);
    if(!valid) {
        const error = new Error("La tarea no existe")
        return res.status(404).json({msg: error.message})
    }

    try {
        const tarea = await Tarea.findById(id.trim()).populate("proyecto");
        if(!tarea){
            res.status(404).json({msg: "No encontrada"})
        };

        if(tarea.proyecto.creador.toString() !== req.usuario._id.toString()) {
            return res.status(401).json({msg: "No autorizado"})
        }

        await tarea.deleteOne()
        res.json({msg: "Tarea eliminada"})
        
    } catch (error) {
        res.status(404).json({msg: "Algo salió mal", error})
        
    };
};

const cambiarEstado = async (req, res) => {};

export {
    agregarTarea,
    obtenerTarea,
    actualizarTarea,
    eliminarTarea,
    cambiarEstado
}
