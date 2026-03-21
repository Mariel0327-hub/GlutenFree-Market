import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";


const ProtectedRoute = ({ children }) => {
  const { token } = useContext(UserContext);

  // Si no hay token, lo redirigimos al login
  if (!token) {
    return <Navigate to="/login" />;
  }

  // Si hay token, renderizamos la página (children)
  return children;
};

export default ProtectedRoute;