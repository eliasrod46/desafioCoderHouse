//Requires
//REVISAR ESTA RUTA(BBDD)
const { Router } = require("express");
const carritoController = require("../controllers/carrito.controller.js");
const router = Router();

//0Ver carritos creados
router.get("/vercarritos", carritoController.seeCart);

//1Crear carrito, devuelve id
router.post("/", carritoController.addCart);

//2eliminar carrito
router.delete("/:id", carritoController.delCart);

//3Ver productos del carrito
router.get("/:id/productos", carritoController.showProducts);

// //4Agregar producto al carrito
// router.post("/:id/productos/:id_producto", carritoController.addProducts);

// //5Eliminar producto del carrito
// router.delete("/:id/productos/:id_producto", carritoController.delProduct);

module.exports = router;
