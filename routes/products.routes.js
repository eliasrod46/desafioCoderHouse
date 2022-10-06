//Requires
const { Router } = require("express");
const productController = require("../controllers/product.controller.js");
const router = Router();

router.get("/:id?", productController.getData);

router.post("/", productController.addData);

router.put("/:id", productController.updateData);

router.delete("/:id", productController.delData);

module.exports = router;
