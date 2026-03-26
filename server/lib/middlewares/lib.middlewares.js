import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const SECRET = process.env.JWT_SECRET;
const ADMIN_ROLE = process.env.ADMIN_ROLE

//User token Auth
export const tokenVerification = (req, res, next) => {
  try {
    const Authorization = req.header("Authorization");

    if (!Authorization) {
      throw { code: 401, message: "No token" };
    }

    const token = Authorization.split("Bearer ")[1];

    if (!SECRET) {
      throw { code: 401, message: "No Secet available" };
    }
    const decodedToken = jwt.verify(token, `${SECRET}`);

    req.user = decodedToken;

    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

//Admin credentials Auth (requiere backoffice en front)
export const adminVerification = (role) => (req, res, next) => {

  try {
    if(!req.user.role || req.user.role !== role){
      return res.status(403).json({message: "Forbidden"})
    }
    next();
  } catch (error) {
    console.error(error);
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};
