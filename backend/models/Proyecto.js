import mongoose from "mongoose";

const proyectosSchema = mongoose.Schema({
    nombre: {
        type: String,
        trim: true,
        required: true
    },
    descripcion: {
        type: String,
        trim: true,
        required: true
    },
    fechaEntrega: {
        type: Date,
        default: Date.now()
    },
    cliente: {
        type: String,
        trim: true,
        required: true
    },
    //creador tiene una relación con otra collection (Usuario), como las DB relacionales
    creador: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Usuario"
    },
    // los corchetes indican que habrá más de uno
    colaboradores: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Usuario"
        }
    ]

},
{
    timestamps: true //crea las columnas de fecha de creciación y modificación
}
);

const Proyecto = mongoose.model("Proyecto", proyectosSchema);

export default Proyecto