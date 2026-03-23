import { pool } from "../db/db.js";
import pkg from 'pg-format';
//Leer compras
const findOrders = async() =>{
  const query = "SELECT * FROM order_total";
  const { rows } = await pool.query(query);
  return rows;
}

//Ver una compra específica
const findOrdersById = async() =>{

}

//Crear Compra
const createOrders = async()=>{

}

//Editar Compra
const updateOrder = async()=>{

}

//Eliminar Compra ?
const deleteOrder = async()=>{

}

const orderModel = {

    findOrders,
    findOrdersById,
    createOrders,
    updateOrder,
    //deleteOrder,


}

export default orderModel