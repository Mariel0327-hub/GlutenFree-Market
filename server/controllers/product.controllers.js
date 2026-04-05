import productModel from "../models/product.models.js";

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

const readAllProductsFiltered = async (req, res) => {
  const queryString = req.query;
  console.log(queryString);
  try {
    const result = await productModel.findAllProductsFiltered(queryString);

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

//Se cambia category por category_id
const createNewProduct = async (req, res) => {
  const { title, product_description, price, image_url, stock, sku, category_id } =
    req.body;
  try {
    const newProduct = await productModel.createProduct({
      title,
      product_description,
      price,
      image_url,
      stock,
      sku,
      category_id,
    });

    if (!newProduct) {
      return res.status(404).json({ message: "No Product Created " });
    }

    return res.status(201).json(newProduct);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateNewProduct = async (req, res) => {
  const { id } = req.params;
  const { title, product_description, price, image_url, sku, category_id } =
    req.body;
  try {
    const result = await productModel.updateProduct({
      id,
      title,
      product_description,
      price,
      image_url,
      sku,
      category_id,
    });

    if (!result) {
      return res.status(404).json({ message: "No Product Updated " });
    }

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

    if (!result) {
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

//////////// CATEGORÌAS
//(PUBLIC)
const readAllCategories = async (req, res) => {
  try {
    const result = await productModel.findAllCategories();

    if (!result) {
      return res.status(404).json({ message: "No Categories Found" });
    }

    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

////(CLIENTS + ADMIN )

const readCategoriesById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await productModel.findCategoriesById(id);

    if (!result) {
      return res.status(404).json({ message: "No Product Found" });
    }

    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
////(ADMIN ONLY)
const createNewCategory = async (req, res) => {
  const { category_description } = req.body;
  try {
    const newCategory = await productModel.createCategory(category_description);
    if (!newCategory) {
      return res.status(404).json({ message: "No Product Created " });
    }

    return res.status(201).json(newCategory);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateNewCategory = async (req, res) => {
  const { id } = req.params;
  const { category_description } = req.body;
  try {
    const result = await productModel.updateCategory(id, category_description);

    if (!result) {
      return res.status(404).json({ message: "No Product Updated " });
    }

    return res
      .status(200)
      .json({ message: "Producto modificado de manera exitosa" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteNewCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await productModel.deleteCategory(id);

    if (!result) {
      return res
        .status(404)
        .json({ message: "Categoría no encontrada o Id inválido" });
    }

    return res.status(200).json({ message: "Categoría eliminada con éxito" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const productController = {
  ////PRODUCTS
  readAllProducts,
  readAllProductsFiltered,
  readProductsByCategory,
  readProductsById,
  createNewProduct,
  updateNewProduct,
  restoreOldProduct,
  deleteNewProduct,

  ////CATEGORÌAS DE PRODUCTO
  readAllCategories,
  readCategoriesById,
  createNewCategory,
  updateNewCategory,
  deleteNewCategory,
};

export default productController;
