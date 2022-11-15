const { USER_COL } = require("../config/environmentConfig.js");
const mongoose = require("mongoose");
const UsuarioSchema = new mongoose.Schema({
  nombre: { type: String, required: true, max: 200 },
  edad: { type: Number, required: true, max: 50 },
  direccion: { type: String, required: true, max: 255 },
  telefono: { type: String, required: true, max: 100 },
  username: { type: String, required: true, max: 100 },
  password: { type: String, required: true, max: 100 },
});

const Usuarios = mongoose.model(USER_COL, UsuarioSchema);
module.exports = Usuarios;
