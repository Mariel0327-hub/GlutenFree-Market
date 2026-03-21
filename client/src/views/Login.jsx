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
  const { user, login } = useContext(UserContext);

  const navigate = useNavigate();


const handleSubmit = (e) => {
    e.preventDefault();

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;

    if (!email || !password) {
      return Swal.fire("Campos vacíos", "Completa todos los datos.", "warning");
    }

    if (!passwordRegex.test(password)) {
      return Swal.fire({
        icon: "error",
        title: "Contraseña poco segura",
        html: `
          <div class="text-start small">
            <p>La contraseña debe cumplir con:</p>
            <ul>
              <li>Mínimo 8 caracteres</li>
              <li>Al menos una letra mayúscula</li>
              <li>Al menos un número</li>
            </ul>
          </div>
        `,
      });
    }

    //  Aqui realice la conexion con el contexto
    // Simule que el backend me devuelve los datos del usuario basándose en lo que escribió
    const loggedUser = {
      email: email, // Traemos el email del estado local
      name: "Usuario Demo", // Por ahora estático hasta que lo conecte la DB
      avatar_url: "https://via.placeholder.com/150", // Un placeholder por defecto
      role: "user"
    };

    // Enviamos los datos al Contexto (UserContext)
    login(loggedUser); 

    Swal.fire({
      icon: "success",
      title: "¡Bienvenido!",
      text: "Has iniciado sesión correctamente.",
      timer: 2000,
      showConfirmButton: false
    });
    
    
  };
    useEffect(() => {
    if (user) {
      navigate("/perfil");
    }
  }, [user, navigate]);

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

          <Form onSubmit={handleSubmit} className="text-start">
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
