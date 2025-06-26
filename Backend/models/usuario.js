// Importamos mongoose
const mongoose = require('mongoose');

// Extraemos el constructos de Schema desde mongoose
const { Schema } = mongoose;

/**
 * * Definimos el esquema del modelo Usuario
 * * Este esquema define que cada usuario tendrá 
 * un nombre, un email y una contraseña (se guardará encriptada)
 */

const usuarioSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true, // El nombre debe ser único
    },
    email: {
        type: String,
        required: true,
        unique: true, // El email debe ser único
        trim: true,
        lowercase: true // Convertir a minúsculas para evitar duplicados
    },
    password: {
        type: String,
        required: true,
    }
});

// Exportamos el modelo Usuario
module.exports = mongoose.model('Usuario', usuarioSchema);