const { crearProductos } = require("../utils/createFakeProducts.js");

let productsToSend;

//generador de productos Mocks
const fakeProductGenerator = () => {
  productsToSend = [];
  for (let i = 0; i < 5; i++) {
    productsToSend.push(crearProductos());
  }
};

//Enviar porductos mocks
const getData = async (req, res) => {
  fakeProductGenerator();
  res.json(productsToSend);
};

module.exports = { getData };
