import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { UserContext } from "../context/UserContext";

const AdminLogin = () => {
  const [credentials, setCredentials] = useState({ user: "", pass: "" });
  const { setToken, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('http://localhost:3000/api/auth/admin', credentials);

      if (data.adminToken) {
        setToken(data.adminToken);
        setUser({ role: "admin", user: credentials.user });

        localStorage.setItem("token", data.adminToken);

        await Swal.fire({
          icon: "success",
          title: "Acceso Autorizado",
          text: "Bienvenido al Panel de Administración",
          timer: 1500,
          showConfirmButton: false,
        });

        navigate("/admin-panel");
      }
    } catch (error) {
      console.error("Error Login Admin:", error.response?.data);
      Swal.fire({
        icon: "error",
        title: "Acceso Denegado",
        text: error.response?.data?.message || "Credenciales inválidas",
      });
    }
  };

  return (
    <>
      <div className="banner-divider-card pt-5 "></div>
      <div className="container d-flex justify-content-center align-items-center vh-100">
        <div
          className="card shadow-lg p-4"
          style={{ width: "400px", borderRadius: "15px" }}
        >
          <div className="text-center mb-4">
            <h2 className="fw-bold">Admin Panel</h2>
            <p className="text-muted">Ingresa tus credenciales de seguridad</p>
          </div>

          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label className="form-label fw-semibold">Usuario</label>
              <input
                type="text"
                name="user"
                className="form-control form-control-lg"
                placeholder="Ej: admin_root"
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-4">
              <label className="form-label fw-semibold">Contraseña</label>
              <input
                type="password"
                name="pass"
                className="form-control form-control-lg"
                placeholder="••••••••"
                onChange={handleChange}
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-lg w-100 shadow-sm"
            >
              Entrar al Sistema
            </button>
          </form>

          <div className="text-center mt-3">
            <small className="text-muted">
              Acceso restringido a personal autorizado
            </small>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminLogin;
