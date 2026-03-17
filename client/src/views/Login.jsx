import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { FcGoogle } from "react-icons/fc";
import { FaApple, FaFacebook } from "react-icons/fa";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Iniciando sesión con:", email, password);
  };

  return (
    <Container className="my-5 pt-5">
      <Row className="justify-content-center">
        <Col md={6} lg={5} className="text-center">
          <h2 className="fw-bold mb-3 titles-font" style={{ color: "#3e2723" }}>
            Bienvenidos a GlutenFree
          </h2>
          <p className="text-muted mb-5 body-font">
            Disfruta de los mejores productos sin gluten de nuestra comunidad.
          </p>

          <Form onSubmit={handleSubmit} className="text-start">
            <Form.Group className="mb-4" controlId="formBasicEmail">
              <Form.Label className="fw-bold small">E-mail</Form.Label>
              <Form.Control
                type="email"
                placeholder="Escribe tu e-mail"
                className="rounded-3 py-2 border-light-subtle shadow-sm"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-2" controlId="formBasicPassword">
              <Form.Label className="fw-bold small">Contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="Escribe tu contraseña"
                className="rounded-3 py-2 border-light-subtle shadow-sm"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <div className="text-end mb-4">
              <a href="#!" className="text-muted small text-decoration-none">
                ¿Olvidaste mi contraseña?
              </a>
            </div>

            <Button
              variant="primary"
              type="submit"
              className="w-100 py-2 mb-4 rounded-pill shadow-sm btn-login"
            >
              Iniciar sesión
            </Button>
          </Form>

          <div className="position-relative my-4">
            <hr />
            <span className="position-absolute top-50 start-50 translate-middle bg-white px-3 text-muted small">
              Hacerlo a través de otras cuentas
            </span>
          </div>

          <div className="d-flex justify-content-center gap-3 mb-5">
            <button className="social-btn">
              <FcGoogle size={24} />
            </button>
            <button className="social-btn">
              <FaApple size={24} />
            </button>
            <button className="social-btn">
              <FaFacebook size={24} color="#1877F2" />
            </button>
          </div>

          <p className="text-muted">
            ¿No tienes cuenta?{" "}
            <a
              href="/registro"
              className="fw-bold text-decoration-none"
              style={{ color: "#7c5c4c" }}
            >
              Regístrate
            </a>
          </p>
        </Col>
      </Row>
    </Container>
  );
}
