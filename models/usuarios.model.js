const { Schema, model } = require("mongoose");

const UsuarioSchema = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const Usuarios = model("productos", UsuarioSchema);

module.exports = { Usuarios };
