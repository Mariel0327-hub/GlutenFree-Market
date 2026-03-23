import { pool } from "../db/db.js";
import pkg from 'pg-format';
//registrar usuario nuevo
const addUser = async() =>{

}

//hacer login
const verifyUser = async()=>{

}

//obtener perfilde usuario
const getUserData = async()=>{

}

const authModel = {
    addUser,
    verifyUser,
    getUserData
}

export default authModel



//db solution:

/* 

import { uuidv7 } from 'uuidv7';

const customerId = uuidv7(); // 018f6e3a-b5c2-7000-9a3d-5f2c1d4e8b0a

*/