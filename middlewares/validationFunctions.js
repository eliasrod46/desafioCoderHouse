

const sessionUpdate = (req, res, next) => {
  // req.session._garbage = Date();
  // req.session.touch();
  return next();
};

module.exports = {sessionUpdate} ;
