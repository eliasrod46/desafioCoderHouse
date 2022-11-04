function getRoot(req, res) {
  if (req.isAuthenticated()) {
    const { username, password } = req.user;
    const user = { username, password };
    res.render("index", { user });
  } else {
    res.render("auth/login/login");
  }
}

//---->Login
function getLogin(req, res) {
  if (req.isAuthenticated()) {
    res.redirect("/");
  } else {
    res.render("auth/login/login");
  }
}

function postLogin(req, res) {
  const { username, password } = req.user;
  const user = { username, password };
  // res.render("index", { user });
  res.redirect("/");
}

function getFaillogin(req, res) {
  res.render("auth/login/login-error", {});
}

//---->Signup
function getSignup(req, res) {
  if (req.isAuthenticated()) {
    res.redirect("/");
  } else {
    res.render("auth/signup/signup");
  }
}

function postSignup(req, res) {
  const { username, password } = req.user;
  const user = { username, password };
  res.render("index", { user });
}

function getFailsignup(req, res) {
  res.render("auth/signup/signup-error", {});
}

//---->Logout
function getLogout(req, res) {
  req.logout();
  res.render("auth/login/login");
}

//---->Info
function getInfo(req, res) {
  //----> datos de session del us logeado
  const { username, password } = req.user;
  const user = { username, password };

  //----> recibo y depuro el objeto de argumentos recibidos por linea de comandos
  const argsRecived = (args = require("../server.js"));
  delete argsRecived._;
  delete argsRecived.$0;

  //---->Uso de reduce para obtener el total de memoria usada
  const totalMemory = Object.keys(process.memoryUsage()).reduce(
    (previous, key) => {
      return previous + process.memoryUsage()[key];
    },
    0
  );

  //---->Envio el obj process, y el total de memoria usada a la vista info
  res.render("info", { user, process, totalMemory, argsRecived });
}

module.exports = {
  getRoot,
  getLogin,
  getSignup,
  postLogin,
  postSignup,
  getFaillogin,
  getFailsignup,
  getLogout,
  getInfo,
};
