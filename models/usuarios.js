const {USER_COL} = require('../config/environmentConfig.js')
const mongoose = require("mongoose");
const UsuarioSchema = new mongoose.Schema({
  username: { type: String, required: true, max: 100 },
  password: { type: String, required: true, max: 100 },
});

const Usuarios = mongoose.model(USER_COL, UsuarioSchema);
module.exports = Usuarios;
