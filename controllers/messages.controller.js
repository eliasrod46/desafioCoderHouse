//------>importo e instancio el dao de productos
const messageMongoDao = require("../models/daos/mensaje.mongo.dao.js");
const messageDao = new messageMongoDao();

const { normalizeMensajes } = require("../utils/normalizeData.js");
const { logger } = require("../middlewares/logger.js");
class MessagesController {
  constructor() {}

  async getAll() {
    try {
      //Consulto a la bbdd
      const daoResponse = await messageDao.getAllMessages();
      //retorno
      return daoResponse;
    } catch (err) {
      return { error: err };
    }
  }

  //obtener chat normalizado
  async getAllNormalized() {
    try {
      //Consulto a la bbdd
      const daoResponse = await messageDao.getAllMessages();
      //Normalizo el chat
      const info = normalizeMensajes(daoResponse);
      //retorno
      return info;
    } catch (err) {
      return { error: err };
    }
  }

  async addMessage(Mssg) {
    try {
      const daoResponse = await messageDao.addMessage(Mssg);
      //retorno
      if (!daoResponse) {
        throw new Error("Error al guardar");
      }
    } catch (err) {
      logger.error("error en model: " + err);
    }
  }
}

module.exports = { MessagesController };
