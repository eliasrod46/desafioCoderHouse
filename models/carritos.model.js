const { dbFirebase } = require("../config/configDB.js");

class Carrito {
  constructor(db) {
    this.db = db;
  }

  //0Crear carrito, devuelve id
  async getAllCart() {
    try {
      const resFB = await this.db.collection("carritos").get();
      const carritosMapeados = resFB.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      return carritosMapeados;
    } catch (error) {
      console.log(error);
    }
  }

  //1Crear carrito, devuelve id
  async createCart() {
    try {
      const resFB = await this.db
        .collection("carritos")
        .doc(/*Se puede especificar la id sino se genera solo */)
        .set({ productos: [] });
      return "Carrito Creado";
    } catch (error) {
      console.log(error);
    }
  }

  //2eliminar carrito
  async deleteCart(id) {
    try {
      const resFB = await this.db.collection("carritos").doc(id).delete();
      return "Carrito Eliminado";
    } catch (error) {
      console.log(error);
    }
  }

  //3Ver productos del carrito
  async showProductsInCart(id) {
    try {
      const query = this.db.collection("carritos");
      const doc = query.doc(String(id));
      const found = await doc.get();

      return found.data();
    } catch (error) {
      console.log(error);
    }
  }

  //4Agregar producto al carrito
  async addProductsToCart(id, arrayProductos) {
    try {
      const res = await this.db
        .collection("carritos")
        .doc(id)
        .update({ productos: arrayProductos.productos });
      return "producto Agregado";
    } catch (error) {
      console.log(error);
    }
  }

  //5Eliminar producto del carrito
  async delProductsToCart(id, id_producto, arrayProductosInCart) {
    try {
      let chkProd = false;
      let position = -1;
      // busco si el producto esta en el carrito
      arrayProductosInCart.forEach((product, index) => {
        if (product.id == id_producto) {
          chkProd = true;
          position = index;
        }
      });

      // Verifico si el producto esta en el carrito
      if (chkProd) {
        arrayProductosInCart.splice(position, 1);
        const res = await this.db
          .collection("carritos")
          .doc(id)
          .update({ productos: arrayProductosInCart });
        return "Producto Eliminado";
      } else {
        return "El producto con el id ingresado no se encuentra en el carrito";
      }
    } catch (error) {
      console.log(error);
    }
  }
}

const CarritoModel = new Carrito(dbFirebase);

module.exports = {CarritoModel};
