//-------------------------------------------------------------------------------
//--------------------------------Tabla Productos--------------------------------
//-------------------------------------------------------------------------------

const productos = document.getElementById("divProductos");

fetch("/api/productos")
  .then((res) => {
    return res.json();
  })
  .then((datos) => {
    console.log(datos);
    const add = datos.respuesta
      .map((dato) => {
        return `
        
        <div class="card" style="width: 18rem">
          <img src=${dato.foto} class="card-img-top" alt=${dato.nombre} />
          <div class="card-body">
          <h5 class="card-title">${dato.nombre}</h5>
          <h6 class="card-title">Stock disponible: ${dato.stock}</h6>
          <h3 class="card-title">Precio: ${dato.precio}</h3>

            <a href="/producto?id=${dato._id}" class="btn btn-primary">agregar al carrito</a>
          </div>
        </div>        
        `;
      })
      .join(" ");

    productos.innerHTML = add;
  });

//-------------------------------------------------------------------------------
//--------------------------------------Chat-------------------------------------
//-------------------------------------------------------------------------------
// import { desnormalizar } from "./funciones.js";
// const socket = io();

// //Socket Chat
// socket.on("messages", (chats) => {
//   const compresion = document.getElementById("compresion");
//   compresion.innerHTML = chats[1];
//   const chatDesnormalizado = desnormalizar(chats[0]);
//   const divMsj = document.getElementById("messages");
//   const add = chatDesnormalizado.chats
//     .map((chat) => {
//       return `
//     <p>
//     <span style="color: blue;">${chat.author.id}</span>
//     <span style="color: brown;">[${chat.date}]: </span>
//     <span style="color: green;">${chat.text}</span>
//     <img class='avatar' src='${chat.author.avatar}'></img>
//     </p>
//     `;
//     })
//     .join(" ");
//   divMsj.innerHTML = add;
// });

// //Boton send msg
// const boton = document.getElementById("send");
// boton.addEventListener("click", (e) => {
//   const id = document.getElementById("id").value;
//   const nombre = document.getElementById("nombre").value;
//   const apellido = document.getElementById("apellido").value;
//   const edad = document.getElementById("edad").value;
//   const alias = document.getElementById("alias").value;
//   const avatar = document.getElementById("avatar").value;
//   const text = document.getElementById("text");
//   const date =
//     new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString();

//   const msjToSend = {
//     author: {
//       id,
//       nombre,
//       apellido,
//       edad,
//       alias,
//       avatar,
//     },
//     text: text.value,
//     date,
//   };
//   text.value = "";
//   socket.emit("newMessage", JSON.stringify(msjToSend));
// });
