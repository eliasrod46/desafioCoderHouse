const { CarritoMongoDao } = require("../models/daos/carrito.mongo.dao.js");
const CarritoDao = new CarritoMongoDao();
const { Productos } = require("../models/product.model.js");

//0Ver carritos
const seeCart = async (req, res) => {
  const respuesta = await CarritoDao.getAllCart();
  console.log(respuesta);
  res.json({ respuesta });
};

//1Crear carrito, devuelve id
const addCart = async (req, res) => {
  const respuesta = await CarritoDao.addCart();
  res.json({ respuesta });
};

//2eliminar carrito
const delCart = async (req, res) => {
  const { id } = req.params;
  const respuesta = await CarritoDao.deleteCart(id);
  res.json({ respuesta });
};

//3Ver productos del carrito
const showProducts = async (req, res) => {
  const { id } = req.params;
  const respuesta = await CarritoDao.getProductsInCart(id);
  res.json({ respuesta });
};

//4Agregar producto al carrito
const addProducts = async (req, res) => {
  const { id, id_producto } = req.params;
  const respuesta = await CarritoDao.addProductsToCart(id, id_producto);
  res.json({ respuesta: "sera" });
};

// //5Eliminar producto del carrito
// const delProduct = async (req, res) => {
//   const { id, id_producto } = req.params;

//   //busco el carrito con el id recibido
//   const productosInCart = await CarritoModel.showProductsInCart(id);
//   if (productosInCart.productos.length > 0) {
//     const respuesta = await CarritoModel.delProductsToCart(
//       id,
//       id_producto,
//       productosInCart.productos
//     );
//     res.json({ respuesta: respuesta });
//   } else {
//     return res.json({ respuesta: "No hay productos en el carrito" });
//   }
// };

module.exports = {
  seeCart,
  addCart,
  delCart,
  showProducts,
  // addProducts,
  // delProduct,
};
