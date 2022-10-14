const { Mensaje } = require("../models/messages.model.js");
const { normalizeMensajes } = require("../utils/normalizeData.js");

class MessagesController {
  constructor() {}

  async getAll() {
    try {
      //Consulto a la bbdd
      const mensajes = await Mensaje.find({}).sort({});
      //retorno
      return mensajes;
    } catch (err) {
      return { error: err };
    }
  }

  //obtener chat normalizado
  async getAllNormalized() {
    try {
      //Consulto a la bbdd
      const mensajes = await Mensaje.find({}).sort({});
      //Normalizo el char
      const info = normalizeMensajes(mensajes);
      //retorno
      return info;
    } catch (err) {
      return { error: err };
    }
  }

  async addMessage(Mssg) {
    try {
      //guardo el archivo
      const mensajesNuevo = new Mensaje({
        author: {
          id: Mssg.author.id,
          nombre: Mssg.author.nombre,
          apellido: Mssg.author.apellido,
          edad: Mssg.author.edad,
          alias: Mssg.author.alias,
          avatar: Mssg.author.avatar,
        },
        text: Mssg.text,
        date: Mssg.date,
      });
      const Guardado = await mensajesNuevo.save();

      //retorno
      if (!Guardado) {
        throw new Error("Error al guardar");
      }
    } catch (err) {
      console.log("error en model: " + err);
    }
  }
}

module.exports = { MessagesController };
