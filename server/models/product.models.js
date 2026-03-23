import { pool } from "../db/db.js";
import pkg from 'pg-format';

//ver todos los productos
const findAllProducts = async(id) =>{
const query = "SELECT * FROM product"
const {rows} = await pool.query(query)
return rows;
}

//ver productos según id de usuario
const findProductByUSer = async(id)=>{
const query = "SELECT * FROM product where customer_id = $1"
const {rows} = await pool.query(query,[id])
return rows[0];
}

//ver productos según
const findProductById = async(id)=>{
const query = "SELECT * FROM product where product_id = $1"
const {rows} = await pool.query(query,[id])
return rows[0];
}

// crear producto
const createProduct = async({
    title,
    product_description,
    price,
    image_url,
    stock,
    sku,
    category_id
})=>{

const product_id = `cust-${Math.floor(Math.random() * 3000)}`
const is_active = true
const created_at = new Date()
const updated_at = null 
const query = "INSERT INTO product values($1, $2, $3, $4,$5, $6, $7,$8, $9, $10, $11)"
const values = [product_id,title,product_description,price,image_url,stock,category_id,sku,is_active, created_at, updated_at]
const {rows} = await pool.query(query, values)
return rows
}

// crear producto
const updateProduct = async({
    id,
    title,
    product_description,
    price,
    image_url,
    category,
    sku
   
})=>{


const updated_at = new Date() 
const query = "UPDATE product SET title = $1, product_description = $2, price = $3, image_url = $4, category = $5, sku = $6, updated_at = $7 WHERE product_id = $8 RETURNING *"
const values = [title,product_description,price,image_url,category,sku, updated_at,id]
const {rows} = await pool.query(query, values)
return rows[0]

}

// DELETE (soft delete)
const deleteProduct = async(id)=>{
const query = "UPDATE product set is_active = false WHERE product_id = $1"
const {rows} = await pool.query(query,[id])
return rows[0]
}

/* // RESTORE (soft delete reversed)
const restoreProduct = async(id)=>{
const query = "UPDATE product set is_active = true WHERE product_id = $1"
const {rows} = await pool.query(query,[id])
return rows
}
 */

const productModel = {
    findAllProducts,
    findProductByUSer,
    findProductById,
    createProduct,
    updateProduct,
    deleteProduct
    
}

export default productModel