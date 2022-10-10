const {
  MessagesController,
} = require("../../controllers/messages.controller.js");

const chat = (socket, io) => {
  //-----------------------------------------------Chat
  const messages = new MessagesController();

  //Muestro mensajes al entrar a la chat
  //-----------------------------------------------
  (async function () {
    const chats = await messages.getAllNormalized();
    socket.emit("messages", [chats.normalizedPosts, chats.compresion]);
  })();
  //-----------------------------------------------

  //Agrego mensaje y los muetro en el chat
  //-----------------------------------------------
  socket.on("newMessage", (mensajeDelCliente) => {
    const mensajeDelClienteObjet = JSON.parse(mensajeDelCliente);
    (async function (mensajeDelClienteObjet) {
      await messages.addMessage(mensajeDelClienteObjet);
      (async function () {
        const mensajes = await messages.getAllNormalized();
        io.sockets.emit("messages", mensajes);
      })();
    })(mensajeDelClienteObjet);
  });
};

module.exports = { chat };
