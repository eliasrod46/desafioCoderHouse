const { Carritos } = require("../../models/carritos.model.js");

const { logger } = require("../../middlewares/logger.js");

class CarritoMongoDao {
  constructor() {}

  //--->0Ver todos los Carritos
  async getAllCart() {
    const response = await Carritos.find({});
    //-->array de objetos de produtos
    return response;
  }

  //--->1Crear carrito, devuelve id
  async addCart() {
    const carritoNuevo = new Carritos({
      productos: [],
    });
    const response = await carritoNuevo.save();
    //-->objetos de produto
    return response;
  }

  //--->2eliminar carrito
  async deleteCart(id) {
    const response = await Carritos.deleteOne({ _id: id });
    //-->objeto de info query
    return response;
  }

  //--->3Ver productos del carrito
  async getProductsInCart(id) {
    const response = await Carritos.findById(id);
    //-->objetos de produto
    return response;
  }

  // //4Agregar producto al carrito
  // async addProductsToCart(id, arrayProductos) {
  //   try {
  //     const res = await this.db
  //       .collection(CARRITOS_COL)
  //       .doc(id)
  //       .update({ productos: arrayProductos.productos });
  //     return "producto Agregado";
  //   } catch (error) {
  //     logger.error(error);
  //   }
  // }

  // //5Eliminar producto del carrito
  // async delProductsToCart(id, id_producto, arrayProductosInCart) {
  //   try {
  //     let chkProd = false;
  //     let position = -1;
  //     // busco si el producto esta en el carrito
  //     arrayProductosInCart.forEach((product, index) => {
  //       if (product.id == id_producto) {
  //         chkProd = true;
  //         position = index;
  //       }
  //     });

  //     // Verifico si el producto esta en el carrito
  //     if (chkProd) {
  //       arrayProductosInCart.splice(position, 1);
  //       const res = await this.db
  //         .collection(CARRITOS_COL)
  //         .doc(id)
  //         .update({ productos: arrayProductosInCart });
  //       return "Producto Eliminado";
  //     } else {
  //       return "El producto con el id ingresado no se encuentra en el carrito";
  //     }
  //   } catch (error) {
  //     logger.error(error);
  //   }
  // }
}

module.exports = { CarritoMongoDao };
