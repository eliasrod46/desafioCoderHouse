const { Schema, model } = require("mongoose");

const CarritosSchema = new Schema(
  {
    productos: { type: Array, required: true },
  },
  {
    versionKey: false,
  }
);

const Carritos = model("carritos", CarritosSchema);

module.exports = { Carritos };
