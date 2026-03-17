import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { FcGoogle } from "react-icons/fc";
import { FaApple, FaFacebook } from "react-icons/fa";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    shipping_address: "",
    billing_address: "",
    password: "",
  });

  return (
    <Container className="my-5 pt-4">
      <Row className="justify-content-center">
        <Col
          md={8}
          lg={6}
          className="text-center shadow-lg p-5 rounded-4 bg-white"
        >
          <h2 className="fw-bold mb-2" style={{ color: "#3e2723" }}>
            Crea una cuenta
          </h2>
          <p className="text-muted mb-4">Completa tus datos para comenzar.</p>

          <Form className="text-start">
            {/* Nombre completo según tabla DB */}
            <Form.Group className="mb-3">
              <Form.Label className="small fw-bold">Nombre Completo</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ej: Juan Pérez"
                className="auth-input"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="small fw-bold">E-mail</Form.Label>
              <Form.Control
                type="email"
                placeholder="correo@ejemplo.com"
                className="auth-input"
              />
            </Form.Group>

            {/* Campo: shipping_address */}
            <Form.Group className="mb-3">
              <Form.Label className="small fw-bold">
                Dirección de Envío
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Calle, número, ciudad..."
                className="auth-input"
              />
            </Form.Group>

            {/* Campo: billing_address */}
            <Form.Group className="mb-3">
              <Form.Label className="small fw-bold">
                Dirección de Facturación
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Dirección para tu boleta/factura"
                className="auth-input"
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label className="small fw-bold">Contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="Mínimo 8 caracteres"
                className="auth-input"
              />
            </Form.Group>

            <Button
              variant="primary"
              className="w-100 btn-auth rounded-pill py-2 mb-4"
              style={{ backgroundColor: "#7c5c4c", border: "none" }}
            >
              Inscribirse
            </Button>
          </Form>

          <div className="divider my-4">
            <span className="text-muted small">O regístrate con</span>
          </div>

          <div className="d-flex justify-content-center gap-3 mb-4">
            <button className="btn-social">
              <FcGoogle size={24} />
            </button>
            <button className="btn-social">
              <FaApple size={24} />
            </button>
            <button className="btn-social">
              <FaFacebook size={24} color="#1877F2" />
            </button>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
