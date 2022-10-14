const { fork } = require("child_process");

const getData = async (req, res) => {
  let cant;
  //Verifico que reciba la query cant, y establezco la variable cant en base a ese dato
  if (req.query.cant) {
    cant = req.query.cant;
  } else {
    cant = 100000000;
  }
  //---->Forkeo el archivo forkrandmon y le envio la cantidad de veces que va a iterar
  let calculorandmon = fork("./utils/forkRandom.js");
  calculorandmon.send({ msg: "start", data: cant });

  //---->recibo el objeto generado en el archivo forkRandom.js y lo envio al front
  calculorandmon.on("message", (msg) => {
    res.json(msg);
  });
};

module.exports = { getData };
