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
  const { username, password } = req.user;
  const user = { username, password };
  const totalMemory = Object.keys(process.memoryUsage()).reduce(
    (previous, key) => {
      return previous + process.memoryUsage()[key];
    },
    0
  );

  res.render("info", { user, process, totalMemory });
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
