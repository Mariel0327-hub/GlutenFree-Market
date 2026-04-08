import React, { useState, useContext, useEffect } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { FcGoogle } from "react-icons/fc";
import { FaApple, FaFacebook } from "react-icons/fa";
import { UserContext } from "../context/UserContext";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import { loginUserDB } from "../data/connection";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, setToken, setUser } = useContext(UserContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/perfil");
    }
  }, [user, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await loginUserDB({
        email: email,
        customer_password: password, // Aquí enviamos el estado 'password' con el nombre que pide el Back
      });

      if (data.token) {
        const loggedUser = data.user || {
          email: email,
          customer_name: "Usuario", // Valor temporal hasta que cargue el perfil
        };

        setUser(loggedUser);
        setToken(data.token);

        // 3. Persistencia
        localStorage.setItem("user", JSON.stringify(loggedUser));
        localStorage.setItem("token", data.token);

        // 4. Redirección
        const params = new URLSearchParams(window.location.search);
        const redirect = params.get("redirect") || "/perfil";
        navigate(redirect);
      }
    } catch (error) {
      // Si el error persiste, revisa la consola para ver qué dice el servidor
      console.error("Error detallado:", error.response?.data);
      alert(
        "Error al iniciar sesión: " +
          (error.response?.data?.message || "Credenciales inválidas"),
      );
    }
  };

  return (
    <Container className="my-5 pt-4">
      <Row className="justify-content-center">
        <Col
          md={6}
          lg={5}
          className="text-center shadow-lg p-5 rounded-4 bg-white"
        >
          <h2 className="fw-bold mb-3" style={{ color: "#3e2723" }}>
            Iniciar Sesión
          </h2>
          <p className="text-muted mb-4">¡Qué bueno verte de nuevo!</p>

          <Form onSubmit={handleLogin} className="text-start">
            <Form.Group className="mb-3">
              <Form.Label className="small fw-bold">E-mail</Form.Label>
              <Form.Control
                type="email"
                placeholder="correo@ejemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label className="small fw-bold">Contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="Tu contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Button
              type="submit"
              variant="primary"
              className="w-100 rounded-pill py-2 mb-3"
            >
              Entrar
            </Button>
          </Form>

          <p className="small text-muted mt-3">
            ¿No tienes cuenta?{" "}
            <Link
              to="/registro"
              className="text-decoration-none fw-bold"
              style={{ color: "#7c5c4c" }}
            >
              Regístrate aquí
            </Link>
          </p>
        </Col>
      </Row>
    </Container>
  );
}
