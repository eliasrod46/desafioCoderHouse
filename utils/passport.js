const LocalStrategy = require("passport-local").Strategy;
const Usuarios = require("../models/usuarios");
const {
  isValidPassword,
  createHash,
  checkAuthentication,
} = require("../utils/authFunction");
const { logger } = require("../middlewares/logger.js");

const passPort = (passport) => {
  passport.use(
    "login",
    new LocalStrategy((username, password, done) => {
      Usuarios.findOne({ username }, (err, user) => {
        if (err) return done(err);

        if (!user) {
          logger.error("User Not Found with username " + username);
          return done(null, false);
        }

        if (!isValidPassword(user, password)) {
          logger.error("Invalid Password");
          return done(null, false);
        }

        return done(null, user);
      });
    })
  );

  passport.use(
    "signup",
    new LocalStrategy(
      {
        passReqToCallback: true,
      },
      (req, username, password, done) => {
        Usuarios.findOne({ username: username }, function (err, user) {
          if (err) {
            logger.error("Error in SignUp: " + err);
            return done(err);
          }

          if (user) {
            logger.error("User already exists");
            return done(null, false);
          }
          console.log();
          const newUser = {
            username: username,
            password: createHash(password),
            nombre: req.body.nombre,
            edad: req.body.edad,
            direccion: req.body.direccion,
            telefono: req.body.telefono,
          };
          Usuarios.create(newUser, (err, userWithId) => {
            if (err) {
              logger.error("Error in Saving user: " + err);
              return done(err);
            }
            //Usuario guardado
            console.log(user);
            logger.info("User Registration succesful");
            return done(null, userWithId);
          });
        });
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser((id, done) => {
    Usuarios.findById(id, done);
  });
};

module.exports = passPort;
