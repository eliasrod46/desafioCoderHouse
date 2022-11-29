const { Productos } = require("../../models/product.model.js");

class productMongoDao {
  constructor() {}
  //--->obtener todos los productos
  async getAllProducts() {
    const response = await Productos.find({});
    //-->array de objetos de produtos
    return response;
  }

  //--->obtener producto por id
  async getProduct(id) {
    const response = await Productos.findById(id);
    //-->objetos de produto
    return response;
  }

  //--->agregar un nuevo porducto
  async addProduct(product) {
    const productoNuevo = new Productos({
      nombre: product.nombre,
      precio: product.precio,
      stock: product.stock,
      foto: product.foto,
    });
    const response = await productoNuevo.save();
    //-->objetos de produto
    return response;
  }

  //--->eliminar un porducto
  async deleteProduct(id) {
    const response = await Productos.deleteOne({ _id: id });
    //-->objeto de info query
    return response;
  }

  //--->actualizar un porducto
  async updateProduct(id, nombre, precio, stock) {
    const response = await Productos.updateOne(
      { _id: id },
      {
        $set: {
          nombre: nombre,
          precio: precio,
          stock: stock,
        },
      }
    );
    //-->objeto de info query
    return response;
  }
}

module.exports = productMongoDao;
