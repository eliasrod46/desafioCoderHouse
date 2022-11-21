const { CarritoModel } = require("../models/carritos.model.js");
const { Productos } = require("../models/product.model.js");

//0Ver carritos
const seeCart = async (req, res) => {
  const respuesta = await CarritoModel.getAllCart();
  console.log(respuesta);
  res.json({ respuesta });
};

//1Crear carrito, devuelve id
const addCart = async (req, res) => {
  const respuesta = await CarritoModel.createCart();
  res.json({ respuesta });
};

//2eliminar carrito
const delCart = async (req, res) => {
  const { id } = req.params;
  const respuesta = await CarritoModel.deleteCart(id);
  res.json({ respuesta });
};

//3Ver productos del carrito
const showProducts = async (req, res) => {
  const { id } = req.params;
  const respuesta = await CarritoModel.showProductsInCart(id);
  res.json({ respuesta });
};

//4Agregar producto al carrito
const addProducts = async (req, res) => {
  const { id, id_producto } = req.params;
  //busco el producto con el id recibido
  const product = await Productos.findById(id_producto);
  //Verifico si existe el producto
  if (product) {
    //traido el array de productos del carrito indicado
    const productsInCart = await CarritoModel.showProductsInCart(id);
    // pusheo el nuevo producto en el array
    productsInCart.productos.push({
      id: String(product._id),
      nombre: product.nombre,
      precio: product.precio,
      stock: product.stock,
    });
    //Envio el array para actualizar
    const respuesta = await CarritoModel.addProductsToCart(id, productsInCart);
    res.json({ respuesta: respuesta });
  } else {
    res.json({ respuesta: "Producto no encontrado" });
  }
};

//5Eliminar producto del carrito
const delProduct = async (req, res) => {
  const { id, id_producto } = req.params;

  //busco el carrito con el id recibido
  const productosInCart = await CarritoModel.showProductsInCart(id);
  if (productosInCart.productos.length > 0) {
    const respuesta = await CarritoModel.delProductsToCart(
      id,
      id_producto,
      productosInCart.productos
    );
    res.json({ respuesta: respuesta });
  } else {
    return res.json({ respuesta: "No hay productos en el carrito" });
  }
};

module.exports = {
  seeCart,
  addCart,
  delCart,
  showProducts,
  addProducts,
  delProduct,
};
