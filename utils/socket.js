const { chat } = require("./socketChat.js");

const socketModule = (io) => {
  io.on("connection", async (socket) => {
    //saludo
    console.log(`Cliente conectado, id: ${socket.id}`);

    chat(socket, io);
  });
};

module.exports = { socketModule };
