const { fork } = require("child_process");

const getData = async (req, res) => {
  let cant;
  //Verifico que reciba la query cant y si esta dentro del trango pedido
  if (req.query.cant && req.query.cant >= 1 && req.query.cant <= 1000000) {
    cant = req.query.cant;
  } else {
    cant = 100000000;
  }
  let calculorandmon = fork("./utils/forkRandom.js");
  calculorandmon.send({ msg: "start", data: cant });

  calculorandmon.on("message", (msg) => {
    res.send(msg);
  });
};

module.exports = { getData };
