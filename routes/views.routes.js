//Requires
const { Router } = require("express");
const router = Router();
const {
  islogged,
  backToHome,
  saveSession,
  sessionUpdate,
} = require("../middlewares/validationFunctions.js");

//ruta principal
router.get("/", [islogged, sessionUpdate], (req, res) => {
  res.render("home", { title: "Principal", data: req.session["logged"] });
});

//ruta login
router.get("/login", backToHome, (req, res) => {
  return res.render("auth/formlogin", { title: "Iniciar session" });
});

router.post("/login", saveSession, (req, res) => {
  res.redirect("/");
});

router.get("/cerrarsession", (req, res) => {
  const username = req.session["logged"].username;
  req.session.destroy((err) => {
    if (err) {
      return res.json({ status: "Logout Error", body: err });
    }
    return res.render("byeView", {
      title: "Cerrar Session",
      data: username,
    });
  });
});

module.exports = router;
