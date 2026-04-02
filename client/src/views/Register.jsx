import React, { useState, useContext } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { FcGoogle } from "react-icons/fc";
import { FaApple, FaFacebook } from "react-icons/fa";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { registerUserDB } from "../data/connection";
//import axios from "axios";

export default function Register() {
  const { setUser, setToken } = useContext(UserContext); // Usamos el contexto real
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "", // <--- Campo nuevo
    shipping_address: "",
    billing_address: "",
    password: "",
    confirmPassword: "",
    avatar_url: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. Validaciones básicas
    if (formData.password !== formData.confirmPassword) {
      return Swal.fire("Error", "Las contraseñas no coinciden", "error");
    }

    // 2. Preparamos el objeto con los nombres exactos de tu tabla SQL
    const newUserForDB = {
      customer_name: formData.name, // Cambia 'nombre' por tu variable de estado
      email: formData.email,
      phone: formData.phone,
      customer_password: formData.password, // 🚩 ¡Ojo con el nombre aquí!
      shipping_address:
        formData.shipping_address || "Dirección no especificada",
      billing_address: formData.billing_address || "Dirección no especificada",
      img_url_customer:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb", // Valor por defecto si no tienes input
      created_at: new Date(),
      updated_at: new Date(),
    };

    try {
      // 3. Llamada REAL al Backend
      const data = await registerUserDB(newUserForDB);
      console.log("Respuesta completa del servidor:", data);

      if (
        data &&
        (data.token || data.message === "Usuario registrado exitosamente")
      ) {
        // Si el servidor mandara token, lo guardamos (por si acaso en el futuro cambia)
        if (data.token) {
          setUser(data.user);
          setToken(data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem("token", data.token);
        }

        Swal.fire({
          icon: "success",
          title: "¡Registro Exitoso!",
          text: data.message || "Ya puedes iniciar sesión",
          timer: 1500,
          showConfirmButton: false,
        });

        // 🚩 COMO NO HAY TOKEN, LO MANDAMOS AL LOGIN SIEMPRE
        setTimeout(() => navigate("/login"), 2000);
      }
    } catch (error) {
      Swal.fire(
        "Error",
        error.response?.data?.message || "No se pudo crear la cuenta",
        "error",
      );
      // 🚩 CASO ESPECIAL: Si el error es 500, pero el email ya se guardó
      if (
        error.response?.status === 500 ||
        error.response?.data?.code === "23505"
      ) {
        Swal.fire({
          icon: "info",
          title: "Cuenta detectada",
          text: "Tu cuenta se creó correctamente, pero hubo un pequeño error al iniciar sesión automáticamente. Por favor, ingresa manualmente.",
        });

        // Lo mandamos al login porque sabemos que en la DB ya está (por eso el error de duplicado)
        navigate("/login");
      } else {
        // Error real (ej. falta un campo o servidor caído)
        Swal.fire(
          "Error",
          error.response?.data?.message || "No se pudo completar el registro",
          "error",
        );
      }
    }
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

            <Form.Group className="mb-3">
              <Form.Label className="small fw-bold">Telefono</Form.Label>
              <Form.Control
                type="tel"
                name="phone"
                className="form-control"
                onChange={handleChange}
                value={formData.phone}
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
