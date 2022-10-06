const { schema, normalize } = require("normalizr");

//Calculo Compresion
const calcularCompresion = (original, normalized) => {
  const bitOriginal = JSON.stringify(original).length;
  const bitNormalized = JSON.stringify(normalized).length;

  return (bitNormalized * 100) / bitOriginal;
};

//Mapeo el array de mensajes armar el objeto con el formato que queremos y eliminar el object_id de mongoose
const depurarChat = (msj) => {
  const arrChat = { id: "999", chats: [] };
  arrChat.chats = msj.map((item) => {
    return {
      id: item._id,
      author: item.author,
      text: item.text,
      date: item.date,
    };
  });
  return arrChat;
};

//Normalizo los chat
const normalizeMensajes = (msj) => {
  //depuro y foramteo el char el chat
  const chatDepurado = depurarChat(msj);
  //Creo las entidades
  const user = new schema.Entity("users");
  const mensajes = new schema.Entity("mensajes", {
    author: user,
  });
  const chats = new schema.Entity("chats", { chats: [mensajes] });
  //Normalizo el chat
  const normalizedPosts = normalize(chatDepurado, chats);
  //Calculo la compresion
  const compresion = calcularCompresion(msj, normalizedPosts);

  //retorno respuesta
  const respuesta = {
    normalizedPosts: normalizedPosts,
    compresion: compresion,
  };
  return respuesta;
};

module.exports = { normalizeMensajes };
