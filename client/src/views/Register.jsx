import React, { useState, useContext } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { FcGoogle } from "react-icons/fc";
import { FaApple, FaFacebook } from "react-icons/fa";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function Register() {
  const { login } = useContext(UserContext);
  const navigate = useNavigate();

  // 1. Centralizamos todo en formData para no tener estados sueltos
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    shipping_address: "",
    billing_address: "",
    password: "",
    confirmPassword: "", // validacion para confirmar password
    avatar_url: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 1 Regex para validar datos
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;

    // 2. Validaciones usando formData
    if (!formData.email || !formData.password || !formData.name) {
      return Swal.fire(
        "Campos vacíos",
        "Por favor, completa los datos obligatorios.",
        "warning",
      );
    }

    if (formData.password !== formData.confirmPassword) {
      return Swal.fire("Error", "Las contraseñas no coinciden", "error");
    }

    if (!passwordRegex.test(formData.password)) {
      return Swal.fire({
        icon: "error",
        title: "Contraseña poco segura",
        html: `
            <div class="text-start small">
              <p>Requisitos de seguridad:</p>
              <ul>
                <li>Mínimo 8 caracteres</li>
                <li>Al menos una letra mayúscula</li>
                <li>Al menos un número</li>
              </ul>
            </div>
          `,
      });
    }

    // 3. Si todo está OK, creamos el usuario
    const newUser = {
      id: Date.now(),
      name: formData.name,
      email: formData.email,
      shipping_address: formData.shipping_address,
      billing_address: formData.billing_address,
      avatar_url: formData.avatar_url || "https://via.placeholder.com/150", // Fallback
      role: "user",
    };

    // 4. PERSISTENCIA: Mandamos al contexto
    login(newUser);

    Swal.fire({
      icon: "success",
      title: "¡Cuenta creada!",
      text: `Bienvenido/a, ${formData.name}`,
      showConfirmButton: false,
      timer: 1500,
    });

    setTimeout(() => {
      navigate("/perfil");
    }, 1500);
  };
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

          <Form className="text-start" onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label className="small fw-bold">Avatar URL</Form.Label>
              <Form.Control
                type="text"
                placeholder="https://link-a-tu-foto.jpg"
                value={formData.avatar_url}
                onChange={(e) =>
                  setFormData({ ...formData, avatar_url: e.target.value })
                }
              />
            </Form.Group>

            {/* Nombre completo según tabla DB */}
            <Form.Group className="mb-3">
              <Form.Label className="small fw-bold">Nombre Completo</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ej: Juan Pérez"
                className="auth-input"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="small fw-bold">E-mail</Form.Label>
              <Form.Control
                type="email"
                placeholder="correo@ejemplo.com"
                className="auth-input"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
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
                name="shipping_address"
                value={formData.shipping_address}
                onChange={handleChange}
                required
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
                name="billing_address"
                value={formData.billing_address}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label className="small fw-bold">Contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="Mínimo 8 caracteres"
                className="auth-input"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="small fw-bold">
                Confirmar Contraseña
              </Form.Label>
              <Form.Control
                type="password"
                name="confirmPassword"
                placeholder="Repite tu contraseña"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Button
              type="submit"
              variant="primary"
              className="w-100 btn-auth rounded-pill py-2 mb-4"
            >
              Registrarse
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
