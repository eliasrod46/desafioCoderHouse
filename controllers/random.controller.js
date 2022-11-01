const { fork } = require("child_process");

const getData = async (req, res) => {
  let cant;
  //Verifico que reciba la query cant, y establezco la variable cant en base a ese dato
  if (req.query.cant) {
    cant = req.query.cant;
  } else {
    cant = 100000000;
  }
  // //--------------------------------con fork--------------------------------
  // //---->Forkeo el archivo forkrandmon y le envio la cantidad de veces que va a iterar
  // let calculorandmon = fork("./utils/forkRandom.js");
  // calculorandmon.send({ msg: "start", data: cant });

  // //---->recibo el objeto generado en el archivo forkRandom.js y lo envio al front
  // calculorandmon.on("message", (msg) => {
  //   res.json(msg);
  // });
  // //------------------------------------------------------------------------

  //--------------------------------sin fork--------------------------------
  const respuesta = {};
  //---->Iteracion
  for (let i = 0; i < cant; i++) {
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
  res.json(respuesta);

  //------------------------------------------------------------------------
};

module.exports = { getData };
