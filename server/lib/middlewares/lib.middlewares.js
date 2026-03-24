import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();


const SECRET = process.env.SECRET;

export const tokenVerification = async (req, res, next) => {
  try {
    const Authorization = req.header("Authorization");

    if (!Authorization) {
      throw { code: 401, message: "No token" };
    }

    const token = Authorization.split("Bearer ")[1];
    const decodedToken = jwt.verify(token, `${SECRET}`);

    req.user = decodedToken;

    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
