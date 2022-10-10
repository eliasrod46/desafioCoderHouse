const socket = io();
import { desnormalizar } from "./funciones.js";

//-------------------------------------------------------------------------------
//--------------------------------------Chat-------------------------------------
//-------------------------------------------------------------------------------

//Socket Chat
socket.on("messages", (chats) => {
  const compresion = document.getElementById("compresion");
  compresion.innerHTML = chats[1];
  const chatDesnormalizado = desnormalizar(chats[0]);
  const divMsj = document.getElementById("messages");
  const add = chatDesnormalizado.chats
    .map((chat) => {
      return `
    <p>
    <span style="color: blue;">${chat.author.id}</span>
    <span style="color: brown;">[${chat.date}]: </span>
    <span style="color: green;">${chat.text}</span>
    <img class='avatar' src='${chat.author.avatar}'></img>
    </p>
    `;
    })
    .join(" ");
  divMsj.innerHTML = add;
});

//Boton send msg
const boton = document.getElementById("send");
boton.addEventListener("click", (e) => {
  const id = document.getElementById("id").value;
  const nombre = document.getElementById("nombre").value;
  const apellido = document.getElementById("apellido").value;
  const edad = document.getElementById("edad").value;
  const alias = document.getElementById("alias").value;
  const avatar = document.getElementById("avatar").value;
  const text = document.getElementById("text");
  const date =
    new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString();

  const msjToSend = {
    author: {
      id,
      nombre,
      apellido,
      edad,
      alias,
      avatar,
    },
    text: text.value,
    date,
  };
  text.value = "";
  socket.emit("newMessage", JSON.stringify(msjToSend));
});

//-------------------------------------------------------------------------------
//--------------------------------Tabla Productos--------------------------------
//-------------------------------------------------------------------------------

const tabla = document.getElementById("tablaProductos");

fetch("http://localhost:8080/api/productos-test")
  .then((res) => {
    return res.json();
  })
  .then((datos) => {
    const add = datos
      .map((dato) => {
        return `<tr>
    <td>${dato.nombre}</td>
    <td>${dato.precio}</td>
    <td>${dato.stock}</td>
    <td><img src=${dato.foto} alt=${dato.nombre}></td>
  </tr>`;
      })
      .join(" ");

    tabla.innerHTML = add;
  });
