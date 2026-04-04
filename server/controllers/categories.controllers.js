import categoryModel from "../models/categories.models.js";


//////////// CATEGORÌAS
//(PUBLIC)
const readAllCategories = async (req, res) => {
  try {
    const result = await categoryModel.findAllCategories();

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
    const result = await categoryModel.findCategoriesById(id);

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
    const newCategory = await categoryModel.createCategory(category_description);
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
    const result = await categoryModel.updateCategory(id, category_description);

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
    const result = await categoryModel.deleteCategory(id);

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

const categoryController = {

  ////CATEGORÌAS DE PRODUCTO
  readAllCategories,
  readCategoriesById,
  createNewCategory,
  updateNewCategory,
  deleteNewCategory,
};

export default categoryController;
