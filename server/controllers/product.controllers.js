import productModel from "../models/product.models.js";
import jwt from "jsonwebtoken";
import bycrpt from "bcryptjs";

const readAllProducts = async (req, res) => {
  try {
    const result = await productModel.findAllProducts();
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
    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const readProductsByUserId = async (req, res) => {
  const { id } = req.params;
  try {
    await productModel.findProductByUSer(id);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const createNewProduct = async (req, res) => {
  const {
    title,
    product_description,
    price,
    image_url,
    stock,
    sku,
    category,
  } = req.body;
  try {
    await productModel.createProduct({
      title,
      product_description,
      price,
      image_url,
      stock,
      sku,
      category,
    });
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
    await productModel.deleteProduct(id);
    return res.status(200).json({ message: "Elemento eliminado con éxito" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const restoreOldProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await productModel.restoreProduct(id);
    return res.status(200).json({ message: "Elemento recuperado con éxito" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const productController = {
  readAllProducts,
  readProductsByUserId,
  readProductsById,
  createNewProduct,
  updateNewProduct,
  restoreOldProduct,
  deleteNewProduct,
};

export default productController;
