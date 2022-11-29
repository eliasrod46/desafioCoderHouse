//------>importo e instancio el dao de productos
const productMongoDao = require("../models/daos/product.mongo.dao.js");
const productDao = new productMongoDao();
const { logger } = require("../middlewares/logger.js");

//------>Obtener productos
const getData = async (req, res) => {
  const id = req.params.id;
  if (id) {
    //--->Obtener producto por id
    const daoResponse = await productDao.getProduct(id);
    res.json({ respuesta: daoResponse });
  } else {
    //--->Obtener producto por id
    const daoResponse = await productDao.getAllProducts();
    res.json({ respuesta: daoResponse });
  }
};

//------>Agregar producto
const addData = async (req, res) => {
  const product = req.body;
  const daoResponse = await productDao.addProduct(product);
  res.json({ respuesta: daoResponse });
};

//------>eliminar producto
const delData = async (req, res) => {
  const { id } = req.params;
  const daoResponse = await productDao.deleteProduct(id);
  if (daoResponse.deletedCount == 1) {
    res.json({ respuesta: "Producto eliminado" });
  } else {
    logger.error("Producto no encontrado");
    res.json({ respuesta: "Producto no encontrado" });
  }
};

//------>actualizar producto
const updateData = async (req, res) => {
  const { id } = req.params;
  const { nombre, precio, stock } = req.body;
  const daoResponse = await productDao.updateProduct(id, nombre, precio, stock);

  if (daoResponse.modifiedCount == 1) {
    res.json({ respuesta: "Usuario Modificado" });
  } else {
    logger.error("Usuario NO Modificado");
    res.json({ respuesta: "Usuario NO Modificado" });
  }
};

module.exports = { getData, addData, updateData, delData };
