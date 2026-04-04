import { uuidv7 } from "uuidv7";
import { pool } from "../db/dbSwitch.js";

//////////// CATEGORÌAS
//(PUBLIC)
const findAllCategories = async () => {
  const query = "SELECT * FROM categories";
  const { rows } = await pool.query(query);
  return rows;
};

////(clients  + ADMIN ) ?
const findCategoriesById = async (id) => {
  const query = "SELECT * FROM categories WHERE category_id = $1";
  const { rows } = await pool.query(query, [id]);
  return rows[0];
};

////(ADMIN ONLY)
const createCategory = async (category_description) => {
  const categoryIdBody = uuidv7();
  const categoryId = `cat-${categoryIdBody}`;

  const values = [categoryId, category_description];
  const query =
    "INSERT INTO categories (category_id, category_description) VALUES( $1, $2) RETURNING *";
  const { rows: rowsCategory } = await pool.query(query, values);
  return rowsCategory[0];
};

const updateCategory = async (id, category_description) => {
  const query =
    "UPDATE categories SET category_description = COALESCE($1, category_description) WHERE category_id = $2 RETURNING *";
  const { rows: rowsCategory } = await pool.query(query, [category_description, id]);
  return rowsCategory[0];
};

const deleteCategory = async (id) => {;
  const query = "DELETE FROM categories WHERE category_id = $1 RETURNING *";
  const { rows } = await pool.query(query, [id]);
  return rows[0];
}


const categoryModel = {

  //CATEGORÌAS DE PRODUCTOS
  findAllCategories,
  findCategoriesById,
  createCategory,
  updateCategory,
  deleteCategory,
};

export default categoryModel;