import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();


const SECRET = process.env.JWT_SECRET;

//User token Auth
export const tokenVerification = (req, res, next) => {
  try {
    const Authorization = req.header("Authorization");

    if (!Authorization) {
      throw { code: 401, message: "No token" };
    }

    const token = Authorization.split("Bearer ")[1];
    
    if(!SECRET){
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
/* export const isAdminCheck = () =>{

  //pide usuario, eamail, contraseña, rol

  //Debe generar un token para poder acceder a los mismos usos que los usuarios autorizados.
  //Debe tener una crendecial extra para acceder con mayores privilegios (condición de filtro para restringir a otros usuarios)

} */