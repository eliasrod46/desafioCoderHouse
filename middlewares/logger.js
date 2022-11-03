const winston = require("winston");

const logger = winston.createLogger({
  // level: "info", //default level si no lo aclaro en los transport
  transports: [
    // new winston.transports.Console({ level: "info" }),
    new winston.transports.File({
      filename: "./logs/warn.log",
      level: "warn",
    }),
    new winston.transports.File({
      filename: "./logs/error.log",
      level: "error",
    }),
  ],
});

const loggInfo = (req, res, next) => {
  logger.info(`Log en la ruta: ${req.originalUrl}, con metodo: ${req.method}`);
  next();
};

const loggWarn = (req, res, next) => {
  logger.warn(
    `La ruta: ${req.originalUrl}, con el metodo: ${req.method}. No existe`
  );
  next();
};

module.exports = { loggInfo, loggWarn, logger };
