import { uuidv7 } from "uuidv7";
import { pool } from "../db/dbSwitch.js";
import format from "pg-format";

//ver todos los productos
const findAllProducts = async () => {
  const query = "SELECT * FROM product WHERE is_active = true";
  const { rows } = await pool.query(query);
  return rows;
};

//ver todos los productos (paginacion para implementar en una versión posterior)
const findAllProductsFiltered = async ({ limit = 10, order_by }) => {
  const FIELD_PRODUCT_ALIAS = {
    productid: "product_id",
    idcustomer: "id_customer",
  };

  const [alias, dir] = order_by.split("_");
  const campo = FIELD_PRODUCT_ALIAS[alias] || alias;
  const queryFormat = format(
    "SELECT * FROM product ORDER BY %s %s LIMIT %s",
    campo,
    dir,
    limit,
  );
  const { rows: filters } = await pool.query(queryFormat);
  return filters;
};

//Ver productos según categoria (secciones de productos)
const findProductByCategory = async (id) => {
  const query =
    "SELECT p.*, c.category_description FROM product p JOIN categories c ON p.category = c.category_id where p.category = $1";
  const { rows } = await pool.query(query, [id]);
  return rows;
};

//ver producto específico según id (detallde de producto)
const findProductById = async (id) => {
  const query = "SELECT * FROM product where product_id = $1";
  const { rows } = await pool.query(query, [id]);
  return rows[0];
};

// crear producto  //ADMIN   //se cambia category por id_category
const createProduct = async ({
  title,
  product_description,
  price,
  image_url,
  stock,
  sku,
  id_category,
}) => {
  const productIdBody = uuidv7();
  const product_id = `prod-${productIdBody}`;

  const is_active = true;
  const created_at = new Date();
  const query =
    "INSERT INTO product (product_id, title, product_description, price, image_url,stock, id_category, sku, is_active, created_at) values($1, $2, $3, $4,$5, $6, $7,$8, $9, $10) RETURNING *";
  const values = [
    product_id,
    title,
    product_description,
    price,
    image_url,
    stock,
    id_category,
    sku,
    is_active,
    created_at,
  ];
  console.log(values);

  const { rows } = await pool.query(query, values);
  return rows[0];
};

// crear producto //ADMIN
const updateProduct = async ({
  id,
  title,
  product_description,
  price,
  image_url,
  id_category,
  sku,
}) => {
  const updated_at = new Date();

  const query =
    "UPDATE product SET title =COALESCE($1, title), product_description =COALESCE($2, product_description), price =COALESCE($3, price), image_url =COALESCE($4, image_url), id_category =COALESCE($5,id_category), sku =COALESCE($6, sku), updated_at = $7 WHERE product_id = $8 RETURNING *";
  const values = [
    title,
    product_description,
    price,
    image_url,
    id_category,
    sku,
    updated_at,
    id,
  ];
  const { rows } = await pool.query(query, values);
  return rows[0];
};

// DELETE (soft delete)  //ADMIN
const deleteProduct = async (id) => {
  const query =
    "UPDATE product set is_active = false WHERE product_id = $1 RETURNING *";
  const { rows } = await pool.query(query, [id]);
  return rows[0];
};

//RESTORE (soft delete reversed) //ADMIN
const restoreProduct = async (id) => {
  const query = "UPDATE product set is_active = true WHERE product_id = $1";
  const { rows } = await pool.query(query, [id]);
  return rows;
};

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
  const { rows: rowsCategory } = await pool.query(query, [
    category_description,
    id,
  ]);
  return rowsCategory[0];
};

const deleteCategory = async (id) => {
  const query = "DELETE FROM categories WHERE category_id = $1 RETURNING *";
  const { rows } = await pool.query(query, [id]);
  return rows[0];
};

const productModel = {
  //PRODCUTOS
  findAllProducts,
  findAllProductsFiltered,
  findProductByCategory,
  findProductById,
  createProduct,
  updateProduct,
  restoreProduct,
  deleteProduct,

  //CATEGORÌAS DE PRODUCTOS
  findAllCategories,
  findCategoriesById,
  createCategory,
  updateCategory,
  deleteCategory,
};

export default productModel;
