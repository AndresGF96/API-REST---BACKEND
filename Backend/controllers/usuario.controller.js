//Importar el modelo de Usuario desde Mongoose
const Usuario = require('../models/usuario');

// Importar dependencias necesarias
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Crear un objeto controlador para manejar las operaciones relacionadas con los usuarios
const usuarioCtrl = {};

// Crear un nuevo usuario
// Esta función maneja la creación de un nuevo usuario
usuarioCtrl.createUsuario = async (req, res) => {
    const { name, email, password } = req.body;

// Encontrar si el usuario ya existe
// Verifica si ya existe un usuario con el mismo email
const existingUser = await Usuario.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ message: 'El usuario ya existe' });
        }

// Encriptar la contraseña
const hashedPassword = await bcrypt.hash(password, 10);

// Crear un nuevo usuario
const newUsuario = new Usuario({
    name,
    email,
    password: hashedPassword
});

// Guardar el usuario en la base de datos
await newUsuario.save();

res.json({
    message: 'Usuario creado exitosamente'});
};


// Retornar el usuario creado
usuarioCtrl.getUsuarios = async (req, res) => {
    const usuarios = await Usuario.find();
    res.json(usuarios);
};

 // Obtener un único usuario por ID
usuarioCtrl.getUnicoUsuario = async (req, res) => {
    const usuario = await Usuario.findById(req.params.id);
    if (!usuario) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.json(usuario);
}

// Actualizar un usuario por ID
usuarioCtrl.updateUsuario = async (req, res) => {
    try {
        const usuarioActualizado = await Usuario.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!usuarioActualizado) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.json({ message: 'Usuario actualizado correctamente', usuario: usuarioActualizado });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Eliminar un usuario por ID
usuarioCtrl.deleteUsuario = async (req, res) => {
    const usuario = await Usuario.findByIdAndDelete(req.params.id);
    if (!usuario) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.json({ message: 'Usuario eliminado exitosamente' });
}


/**
 * Función para iniciar sesión
 * Verifica si el usuario existe
 * Verifica la contraseña (encriptada)
 * Genera un token JWT si las credenciales son correctas
 * Retorna el token al cliente
 */
usuarioCtrl.loginUsuario = async (req, res) => {
    const { email, password } = req.body;

// Buscar el usuario por email
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
    }

// Verificar la contraseña
const passwordValid = await bcrypt.compare(password, usuario.password);
    if (!passwordValid) {
        return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

// Generar un token JWT (Valido por 1 hora)
const token = jwt.sign({ id: usuario._id}, 'secreto123', { expiresIn: '1h' });

// Retornar el token al cliente
res.json({ message: 'Inicio de sesión exitoso', token });
}

//Exportar los controladores
module.exports = usuarioCtrl;