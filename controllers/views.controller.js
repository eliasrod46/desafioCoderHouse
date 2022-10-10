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
    const { username, password } = req.user;
    const user = { username, password };
    // res.render("index", { user });
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

function getSignup(req, res) {
  if (req.isAuthenticated()) {
    const { username, password } = req.user;
    const user = { username, password };
    res.render("profileUser", { user });
  } else {
    res.render("auth/signup/signup");
  }
}

function postSignup(req, res) {
  const { username, password } = req.user;
  const user = { username, password };
  res.render("profileUser", { user });
}

function getFailsignup(req, res) {
  res.render("auth/signup/signup-error", {});
}

function getLogout(req, res) {
  req.logout();
  res.render("auth/login/login");
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
};
