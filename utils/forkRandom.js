//El dato devuelto al frontend será un objeto que contendrá como claves los números random generados junto a la cantidad de veces que salió cada uno. Esta ruta no será bloqueante (utilizar el método fork de child process). Comprobar el no bloqueo con una cantidad de 500.000.000 de randoms.

process.on("message", (info) => {
  if (info.msg == "start") {
    const respuesta = {};
    for (let i = 0; i < info.data; i++) {
      let num = Math.floor(Math.random() * info.data);
      if (!respuesta[num]) {
        respuesta[num] = 1;
      } else {
        respuesta[num]++;
      }
    }

    process.send({ respuesta });
  }
});
