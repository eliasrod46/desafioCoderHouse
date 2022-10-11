module.exports = {
  MONGO_URI: process.env.MONGO_URI || "url servidor mongo",
  SECRET_KEY_SESSION: process.env.SECRET_KEY_SESSION || "clave secreta",
  USER_COL: process.env.USER_COL || "usuarios",
  MESSAGES_COL: process.env.MESSAGES_COL || "messages",
  PRODUCTS_COL: process.env.PRODUCTS_COL || "productos",
  CARRITOS_COL: process.env.CARRITOS_COL || "carritos",
};
