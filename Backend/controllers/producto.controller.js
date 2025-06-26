/**

* Se coloca el controlador como un objeto y luego se exporta como

* se requiere primero el modelo producto

*/

const Producto = require('../models/Producto');
const productoCtrl = {};

/**

* DEFINO LOS MÉTODOS */

//Obtener todos los productos

productoCtrl.getProductos = async (req, res) => {
const productos = await Producto.find();
res.json(productos);

}

// Crear producto
// Esta función maneja la creación de un nuevo producto

productoCtrl.createProductos = async (req, res) => {

const producto = new Producto(req.body);
await empleado.save();
res.json({
'status': 'Producto guardado'

});

}

//Conseguir un único producto

productoCtrl.getUnicoProducto = async (req, res) => {
const productoUnico = await Producto.findById(req.params.id);
res.json(productoUnico);

}

//Actualizar producto

productoCtrl.editarProducto = async (req, res) => {
const { id } = req.params;
const productoEdit = {
name: req.body.name,

};

await Producto.findByIdAndUpdate(id, {$set: productoEdit}, {new: true});

res.json({status: 'Producto Actualizado'});

}

// Eliminar producto

productoCtrl.eliminarProducto = async (req, res) => {
await Producto.findByIdAndDelete(req.params.id);
res.json({status: 'Producto Eliminado'});

}

//exporto el módulo

module.exports = productoCtrl;