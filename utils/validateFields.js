const { validationResult } = require("express-validator");

//Verifica si hay errores capturados
export const validateFields = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json(errors);
  }

  next();
};
