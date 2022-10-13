const { fork } = require("child_process");

const getData = async (req, res) => {
  const random = req.query;
  let calculorandmon = fork("../utils/forkRandom.js");
  calculorandmon.send("start");
  res.send(random);
};

module.exports = { getData };
