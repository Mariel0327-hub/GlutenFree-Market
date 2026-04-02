import { pool } from "../db/dbSwitch.js";
import { uuidv7 } from "uuidv7";

//Ver todas la reseñas  (ADMIN)  //posteriormente se puede implementar un filtro
const findAllReviews = async () => {
  const query = "SELECT * FROM review";
  const { rows } = await pool.query(query);
  return rows;
};

//Ver reseñas según id de review (ADMIN)
const findReviewsById = async (id) => {
  const query = "SELECT * FROM review WHERE review_id = $1";
  const { rows } = await pool.query(query, [id]);
  return rows[0];
};

//Ver reseñas según id de usuario (publico)
const findReviewsByUSer = async (id) => {
  const query = "SELECT * FROM review where id_customer = $1";
  const { rows } = await pool.query(query, [id]);
  return rows;
};

//Ver reseñas según id de producto (publico)
const findReviewsByProduct = async (id) => {
  const query = "SELECT * FROM review where id_product = $1";
  const { rows } = await pool.query(query, [id]);
  return rows;
};

// Crear Review (publico + ADMIN)
const createReview = async (
  email,
  about_product = false,
  id_product,
  review_body,
  rating,
) => {
  //id_customer:
  const { rows: customerRows, rowCount } = await pool.query(
    "SELECT customer_id FROM customer WHERE email = $1",
    [email],
  );

  if (rowCount === 0) {
    throw { code: 404, message: "Customer not found" };
  }

  const id_customer = customerRows[0].customer_id;

  //lógica para identificar un producto
  id_product = about_product === true ? id_product : null;

  //generación de id review:
  const reviewIdBody = uuidv7();

  const review_id = `rev-${reviewIdBody}`;
  const created_at = new Date();
  const updated_at = null;
  const values = [
    review_id,
    id_customer,
    id_product,
    about_product,
    review_body,
    rating,
    created_at,
    updated_at,
  ];

  const query =
    "INSERT INTO review (review_id, id_customer, id_product, about_product, review_body, rating,created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *";
  const { rows } = await pool.query(query, values);
  return rows;
};

// modificar producto  (PUBLIC + ADMIN)
const updateReview = async (
  id,
  about_product,
  id_product,
  review_body,
  rating,
) => {
  const updated_at = new Date();

  //Lógica para identificar un producto
  id_product = about_product === false ? null: id_product ;

  // Si se actualiza about_product a true pero no hay id en el payload.
  if (about_product === true && !id_product) {
    throw { code: 400, message: "id_product required to review a product" };
  }

  //Si no hay about_product en el payload y no hay id. Se revisa si antes había product_id (si era true antes)
  if (about_product === undefined && !id_product) {
    const { rows: idProdRows } = await pool.query(
      "SELECT id_product FROM review WHERE review_id = $1",
      [id],
    );
      //Si era false y el review existe, se devolverá null
      if (!idProdRows[0]) {
    throw { code: 404, message: "Review not found" };
  }
  // se obtiene el id
   id_product = idProdRows[0]?.id_product
  }

  const query =
    "UPDATE review SET about_product =COALESCE($1, about_product), id_product = $2, review_body =COALESCE($3, review_body), rating =COALESCE($4, rating), updated_at =$5 WHERE review_id = $6 RETURNING *";
  const values = [
    about_product,
    id_product,
    review_body,
    rating,
    updated_at,
    id,
  ];
  const { rows } = await pool.query(query, values);
  return rows;
};

// Eliminar review (PUBLIC + ADMIN)
const deleteReview = async (id) => {
  const query = "DELETE FROM review WHERE review_id = $1 RETURNING *";
  const { rows } = await pool.query(query, [id]);
  return rows[0];
};

const reviewModel = {
  findAllReviews,
  findReviewsByProduct,
  findReviewsByUSer,
  findReviewsById,
  createReview,
  updateReview,
  deleteReview,
};

export default reviewModel;
