import mongoose from "mongoose";

const tareaSchema = mongoose.Schema({

    nombre: {
        type: String,
        trim: true,
        require: true
    },
    descripcion: {
        type: String,
        trim: true,
        require: true
    },
    estado: {
        type: Boolean,
        default: false

    },
    fechaEntrega: {
        type: Date,
        default: Date.now(),
        required: true

    },
    prioridad: {
        type: String,
        required: true,
        enum: ['Baja', 'Media', 'Alta']
    },
    proyecto:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Proyecto"
    }
}, {
    timestamps: true
});

const Tarea = mongoose.model("Tarea", tareaSchema);

export default Tarea