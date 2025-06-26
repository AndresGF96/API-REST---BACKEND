// Se utiliza Express Router para crear las rutas de usuario
const express = require('express');
const router = express.Router();

// Se importan los controladores de usuario
// Estos controladores contienen la lógica para manejar las solicitudes HTTP relacionadas con los usuarios
const usuarioCtrl = require('../controllers/usuario.controller');

/**
 * Ruta POST para crear un nuevo usuario / register
 * Permite el registro de un nuevo usuario en el sistema
 */
router.post('/register', usuarioCtrl.createUsuario); // Nuevo usuario

/**
 * Ruta POST para iniciar sesión / login
 * Permite a un usuario existente iniciar sesión en el sistema
 * Espera un cuerpo (body) con los campos 'name' 'email' y 'password'
 * Si las credenciales son correctas, devuelve un token de autenticación
 */
router.post('/login', usuarioCtrl.loginUsuario); // Iniciar sesión

/**
 * Ruta GET para obtener todos los usuarios
 * Permite obtener una lista de todos los usuarios registrados en el sistema
 */
router.get('/', usuarioCtrl.getUsuarios); // Obtener todos los usuarios


/**
 * Ruta GET para obtener un usuario específico por ID
 * Permite obtener los detalles de un usuario específico utilizando su ID
 */
router.get('/:id', usuarioCtrl.getUnicoUsuario); // Obtener un único usuario


// Se exporta el router para usarlo en el archivo principal del servidor (index.js)
module.exports = router;
