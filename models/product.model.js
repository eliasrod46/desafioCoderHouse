const { Schema, model } = require("mongoose");
const { PRODUCTS_COL } = require("../config/environmentConfig.js");

const ProductoSchema = new Schema({
  nombre: { type: String, required: true },
  precio: { type: Number, required: true },
  stock: { type: Number, required: true },
  foto: { type: String, required: true },
});

const Productos = model(PRODUCTS_COL, ProductoSchema);

module.exports = { Productos };
