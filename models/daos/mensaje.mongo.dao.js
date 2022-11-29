const { Mensaje } = require("../../models/messages.model.js");

class messageMongoDao {
  constructor() {}
  //--->obtener todos los productos
  async getAllMessages() {
    const response = await Mensaje.find({}).sort({});
    return response;
  }

  //--->agregar un nuevo porducto
  async addMessage(Mssg) {
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
    const response = await mensajesNuevo.save();
    return response;
  }
}

module.exports = messageMongoDao;
