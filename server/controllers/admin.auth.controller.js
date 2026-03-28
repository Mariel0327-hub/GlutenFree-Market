//ADMIN credenetials are stored as .env variables:
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import bycrpt from "bcryptjs";
dotenv.config();

const ADM_USER = process.env.ADMIN_USERNAME;
const ADM_PASS = process.env.ADMIN_PASSWORD;
const SECRET = process.env.JWT_SECRET;


//login
export const authenticateAdmin = async (req, res) => {
  const { user, pass } = req.body;

  try {
    //check if there is credentials
    if (!user || !pass) {
      return res.status(400).json({ message: "Missing credentials" });
    }

    //validate credentials
    if (user !== ADM_USER || pass !== ADM_PASS) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    //create Admin Token
    const adminToken = jwt.sign({ user: ADM_USER, role: process.env.ADMIN_ROLE }, SECRET, {
      expiresIn: "3h",
    });

    return res.status(200).json({ adminToken });
  } catch (error) {
    console.error("[ADMIN_AUTH]", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};