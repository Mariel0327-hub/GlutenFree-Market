import React, { useState, useContext, useEffect } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { FcGoogle } from "react-icons/fc";
import { FaApple, FaFacebook } from "react-icons/fa";
import { UserContext } from "../context/UserContext";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";

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

  const handleLogin = (e) => {
    e.preventDefault();
    
    if (email === "test@test.com" && password === "Test123456") {
      const loggedUser = {
        email: "test@test.com",
        name: "Usuario Demo",
        orders: [
          {
            order_id: "ORD-001",
            date: "2026-03-20",
            total: 25000,
            status: "Entregado",
            items: [
              {
                product_id: 1,
                title: "Pan Integral",
                price: 5000,
                quantity: 1,
              },
              { product_id: 2, title: "Muffin Gf", price: 3500, quantity: 2 },
            ],
          },
          {
            order_id: "ORD-002",
            date: "2026-03-22",
            total: 12500,
            status: "Por retirar",
            items: [
              {
                product_id: 3,
                title: "Baguette Masa Madre",
                price: 12500,
                quantity: 1,
              },
            ],
          },
          {
            order_id: "ORD-003",
            date: "2026-03-22",
            total: 18000,
            status: "En proceso",
            items: [
              {
                product_id: 4,
                title: "Rollitos de Canela",
                price: 4500,
                quantity: 4,
              },
            ],
          },
        ],
      };
      // 1. Guardamos en el Estado Global
      setUser(loggedUser);
      setToken("token-demo-xyz-123");

      // 2. Guardamos en LocalStorage para que no se borre al recargar
      localStorage.setItem("user", JSON.stringify(loggedUser));
      localStorage.setItem("token", "token-demo-xyz-123");

      const params = new URLSearchParams(window.location.search);
      const redirect = params.get("redirect") || "/perfil";
      navigate(redirect);
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
