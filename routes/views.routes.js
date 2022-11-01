const { Router } = require("express");
const { sessionUpdate } = require("../middlewares/validationFunctions");
const passport = require("passport");
const { checkAuthentication } = require("../utils/authFunction");
const controllerViews = require("../controllers/views.controller");

const router = Router();

//-->Raiz
router.get("/", sessionUpdate, controllerViews.getRoot);

//--->Login
router.get("/login", controllerViews.getLogin);
router.post(
  "/login",
  passport.authenticate("login", { failureRedirect: "/faillogin" }),
  controllerViews.postLogin
);
router.get("/faillogin", controllerViews.getFaillogin);

//--->signup
router.get("/signup", controllerViews.getSignup);
router.post(
  "/signup",
  passport.authenticate("signup", { failureRedirect: "/failsignup" }),
  controllerViews.postSignup
);
router.get("/failsignup", controllerViews.getFailsignup);
router.get("/logout", controllerViews.getLogout);

router.get(
  "/info",
  // [sessionUpdate, checkAuthentication],
  controllerViews.getInfo
);

module.exports = router;
