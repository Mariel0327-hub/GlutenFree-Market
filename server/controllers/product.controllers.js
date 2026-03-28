import productModel from "../models/product.models.js";
import jwt from "jsonwebtoken";
import bycrpt from "bcryptjs";

const readAllProducts = async (req, res) => {
  try {
    const result = await productModel.findAllProducts();

    if (!result) {
      return res.status(404).json({ message: "No Products Found" });
    }

    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const readProductsById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await productModel.findProductById(id);

    if (!result) {
      return res.status(404).json({ message: "No Product Found" });
    }

    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const readProductsByCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await productModel.findProductByCategory(id);

    if (!result) {
      throw { code: 404, message: "Product or category not found" };
    }

    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

//no será usado (favoritos instead)
/* const readProductsByUserId = async (req, res) => {
  const { id } = req.params;
  try {
    await productModel.findProductByUSer(id);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
}; */

const createNewProduct = async (req, res) => {
  const { title, product_description, price, image_url, stock, sku, category } =
    req.body;
  try {
    const newProduct = await productModel.createProduct({
      title,
      product_description,
      price,
      image_url,
      stock,
      sku,
      category,
    });

    if (!newProduct) {
      return res.status(404).json({ message: "No Product Created " });
    }

    return res
      .status(201)
      .json({ message: "Producto creado de manera exitosa" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateNewProduct = async (req, res) => {
  const { id } = req.params;
  const { title, product_description, price, image_url, sku, category } =
    req.body;
  try {
    const result = await productModel.updateProduct({
      id,
      title,
      product_description,
      price,
      image_url,
      sku,
      category,
    });

    if (!result) {
      return res.status(404).json({ message: "No Product Updated " });
    }

    console.log(result);
    return res
      .status(200)
      .json({ message: "Producto modificado de manera exitosa" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteNewProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await productModel.deleteProduct(id);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "No product deleted" });
    }

    return res.status(200).json({ message: "Elemento eliminado con éxito" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const restoreOldProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await productModel.restoreProduct(id);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "No product restored" });
    }
    return res.status(200).json({ message: "Elemento recuperado con éxito" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const productController = {
  readAllProducts,
  //readProductsByUserId,
  readProductsByCategory,
  readProductsById,
  createNewProduct,
  updateNewProduct,
  restoreOldProduct,
  deleteNewProduct,
};

export default productController;
