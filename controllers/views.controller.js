const { createTransport } = require("nodemailer");
const fs = require("fs");
const TEST_MAIL = "eliasrod46@gmail.com";
const PASS = "gankzjibzzgxfoqb";

const transporter = createTransport({
  service: "gmail",
  port: 587,
  auth: {
    user: TEST_MAIL,
    pass: PASS,
  },
});

function getRoot(req, res) {
  if (req.isAuthenticated()) {
    const { username, password } = req.user;
    const user = { username, password };
    res.render("index", { user });
  } else {
    res.render("auth/login/login");
  }
}

//---->Porductos
function getProductos(req, res) {
  if (req.isAuthenticated()) {
    const { username, password } = req.user;
    const user = { username, password };
    res.render("productos", { user });
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

async function postSignup(req, res) {
  const { username, password, nombre, direccion, edad, telefono } = req.user;
  const mensaje = `<p>Datos del usaurio</p>
  <ul>
  <li>Username: ${username}</li>
  <li>Password: ${password}</li>
  <li>Nombre: ${nombre}</li>
  <li>Edad: ${edad}</li>
  <li>Telefono: ${telefono}</li>
  <li>Direccion: ${direccion}</li>
  </ul>`;
  const mailOptions = {
    from: TEST_MAIL,
    to: TEST_MAIL,
    subject: "nuevo registro",
    html: mensaje,
  };
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(info);
  } catch (err) {
    console.log(err);
  }
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
  getProductos,
};
