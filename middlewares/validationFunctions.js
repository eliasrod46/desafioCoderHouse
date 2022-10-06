const saveSession = (req, res, next) => {
  if (!req.body.username) return res.redirect("/");

  req.session["logged"] = { username: req.body.username };
  return next();
};

const islogged = (req, res, next) => {
  if (!req.session["logged"]) {
    return res.redirect("/login");
  }
  return next();
};

const backToHome = (req, res, next) => {
  if (req.session["logged"]) {
    return res.redirect("/");
  }
  return next();
};

const sessionUpdate = (req, res, next) => {
  req.session._garbage = Date();
  req.session.touch();
  return next();
};

module.exports = { sessionUpdate, backToHome, islogged, saveSession };
