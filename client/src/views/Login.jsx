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
      //llamamos al Backend en Neon
      const data = await loginUserDB({ email, password });

      if (data.token) {
        // aqui ya se guardan los datos REALES que vienen del servidor
        const loggedUser = data.user || data.customer || { email };

        setUser(loggedUser);
        setToken(data.token);

        // 2. Persistencia en LocalStorage
        localStorage.setItem("user", JSON.stringify(loggedUser));
        localStorage.setItem("token", data.token);

        const params = new URLSearchParams(window.location.search);
        const redirect = params.get("redirect") || "/perfil";
        navigate(redirect);
      }
    } catch (error) {
      // manejamos los errores
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
              style={{ backgroundColor: "#7c5c4c", border: "none" }}
            >
              Entrar
            </Button>
          </Form>

          <p className="small text-muted mt-3">
            ¿No tienes cuenta?{" "}
            <Link
              to="/register"
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
