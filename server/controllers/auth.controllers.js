import authModel from "../models/auth.models.js";
import jwt from "jsonwebtoken"
import bycrpt from 'bcryptjs'


const registerUser = async () =>{
    try {
        await authModel.addUser()
    } catch (error) {
        return res.status(500).json({message: "Internal Server Error"})
    }
}

const authenticateUser = async () =>{
    try {
        await authModel.verifyUser()
    } catch (error) {
        return res.status(500).json({message: "Internal Server Error"})
    }
}

const getUserProfile = async () =>{
    try {
        await authModel.getUserData()
    } catch (error) {
        return res.status(500).json({message: "Internal Server Error"})
    }
}


const authController = {
    registerUser,
    authenticateUser,
    getUserProfile,
}

export default authController