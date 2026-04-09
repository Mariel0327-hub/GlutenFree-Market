import { uuidv7 } from "uuidv7";
import { pool } from "../db/dbSwitch.js";
import format from "pg-format";

//ver todos los productos (Se podría implementar un filtro para omitir productos no activos)
const findAllProducts = async () => {
  const query = "SELECT * FROM product";
  const { rows } = await pool.query(query);
  return rows;
};

//ver todos los productos (paginacion a implementar)
const findAllProductsFiltered = async ({ limit = 10, order_by }) => {
  const [campo, dir] = order_by.split("_");
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
  const query = "SELECT * FROM product where category = $1";
  const { rows } = await pool.query(query, [id]);
  return rows;
};

//ver producto específico según id (detallde de producto)
const findProductById = async (id) => {
  const query = "SELECT * FROM product where product_id = $1";
  const { rows } = await pool.query(query, [id]);
  return rows[0];
};

// crear producto  //ADMIN
const createProduct = async ({
  title,
  product_description,
  price,
  image_url,
  stock,
  sku,
  category,
}) => {

  const productIdBody = uuidv7();
  const product_id = `prod-${productIdBody}`;

  const is_active = true;
  const created_at = new Date();
  const query =
    "INSERT INTO product (product_id, title, product_description, price, image_url,stock, category, sku, is_active, created_at) values($1, $2, $3, $4,$5, $6, $7,$8, $9, $10) RETURNING *";
  const values = [
    product_id,
    title,
    product_description,
    price,
    image_url,
    stock,
    category,
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
  category,
  sku,
}) => {
  const updated_at = new Date();

  const query =
    "UPDATE product SET title =COALESCE($1, title), product_description =COALESCE($2, product_description), price =COALESCE($3, price), image_url =COALESCE($4, image_url), category =COALESCE($5,category), sku =COALESCE($6, sku), updated_at = $7 WHERE product_id = $8 RETURNING *";
  const values = [
    title,
    product_description,
    price,
    image_url,
    category,
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

const productModel = {
  findAllProducts,
  findAllProductsFiltered,
  findProductByCategory,
  findProductById,
  createProduct,
  updateProduct,
  restoreProduct,
  deleteProduct,
};

export default productModel;
