const { Productos } = require("../models/product.model.js");

const obtenerProducto = async (id) => {
  try {
    const enviar = await Productos.findById(id);
    return enviar;
  } catch (error) {
    console.log(error);
  }
};

module.exports = { obtenerProducto };
