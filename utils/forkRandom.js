process.on("message", (info) => {
  if (info.msg == "start") {
    const respuesta = {};
    //---->Iteracion
    for (let i = 0; i < info.data; i++) {
      //---->genero numero randmon entre 1 y 1000
      let num = Math.floor(Math.random() * 1000 + 1);
      if (!respuesta[num]) {
        //---->si el numero generado no existe como key del obj respuesta lo creo y le asigno como valor inicial 1
        respuesta[num] = 1;
      } else {
        //---->si el numero generado si existe como key del obj respuesta le sumo 1 al valor que ya tiene
        respuesta[num]++;
      }
    }
    //---->delvuelvo el obj generado
    process.send({ respuesta });
  }
});
