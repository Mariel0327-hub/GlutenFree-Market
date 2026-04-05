import React, { useContext, useState, useEffect } from "react";
import { Container, Card, Button, Row, Col, Form } from "react-bootstrap";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
//import { getInitials } from "../utils/helpers";
import { FaCamera, FaLock, FaPhone } from "react-icons/fa";
import axios from "axios";
import ImageUploader from "../components/ImageUploader";

import {
  FaEnvelope,
  FaMapMarkerAlt,
  FaUserEdit,
  FaCommentDots,
} from "react-icons/fa";
import Swal from "sweetalert2";
import { baseURL } from "../utils/baseUrl";

export default function Profile() {
  const { user, logout, updateUser, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({ name: "", shipping_address: "" });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          // Llamamos a la ruta de perfil que tienes en el Back
          const response = await axios.get(`${baseURL}/api/auth/profile`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUser(response.data);
        }
      } catch (error) {
        console.error("Error al cargar datos desde Neon:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleEditClick = () => {
    if (user) {
      setFormData({
        // Mapeamos los nombres de la BD (izquierda) a tus estados del Form (derecha)
        name: user.customer_name || "",
        email: user.email || "",
        shipping_address: user.shipping_address || "",
        billing_address: user.billing_address || "",
        profile_image: user.img_url_customer || "",
        phone: user.phone || "",
        password: "",
        customer_id: user.customer_id,
      });
      setIsEditing(true);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleSave = async () => {
    try {
      const cleanData = {
        customer_id: user.customer_id,
        customer_name: formData.name,
        email: formData.email,
        phone: formData.phone || user.phone,

        img_url_customer: formData.profile_image || user.img_url_customer,

        shipping_address: formData.shipping_address,
        billing_address: formData.billing_address,

        customer_password:
          formData.password && formData.password.trim() !== ""
            ? formData.password
            : undefined,
      };
        console.log(cleanData)
      const result = await updateUser(cleanData);

      if (result) {
        setUser({
          ...user,
          ...cleanData,
        });
        setIsEditing(false);
        Swal.fire({
          icon: "success",
          title: "¡Perfil Actualizado!",
          text: "Los cambios se guardaron correctamente.",
          timer: 2000,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      console.error("Error al guardar:", error);
      Swal.fire("Error", "No se pudo actualizar el perfil", "error");
    }
  };

  const handleImageSuccess = (url) => {
    setFormData((prev) => ({
      ...prev,
      profile_image: url, // Usamos el nombre que tienes en tu estado de edición
    }));
  };
  return (
    <Container className="py-5 d-flex justify-content-center">
      <Card
        className="shadow-sm border-0 rounded-4 p-4"
        style={{ maxWidth: "550px", width: "100%" }}
      >
        <Card.Body>
          {isEditing ? (
            <Form.Group className="mb-4 text-center">
              <Form.Label className="fw-bold">Foto de Perfil</Form.Label>
              <ImageUploader
                onUploadSuccess={handleImageSuccess}
                currentImage={
                  formData.img_url_customer || user.img_url_customer
                }
              />
              <Form.Text className="text-muted">
                Haz clic para subir una nueva imagen a Cloudinary.
              </Form.Text>
            </Form.Group>
          ) : (
            <div className="text-center mb-4">
              <img
                src={
                  formData.profile_image ||
                  user?.img_url_customer ||
                  "https://via.placeholder.com/150"
                }
                alt="Profile"
                className="rounded-circle img-thumbnail"
                style={{ width: "150px", height: "150px", objectFit: "cover" }}
              />
            </div>
          )}

          <h2 className="fw-bold mt-3 text-center" style={{ color: "#3e2723" }}>
            {isEditing ? "Editar Perfil" : "Mi Perfil"}
          </h2>

          <Form>
            <Row className="g-4 mb-4">
              {/* Campo Nombre */}
              <Col xs={12} className="d-flex align-items-start gap-3">
                <FaUserEdit className="text-muted mt-2" />
                <div className="flex-grow-1">
                  <small className="d-block text-muted fw-bold text-uppercase">
                    Nombre Completo
                  </small>
                  {isEditing ? (
                    <Form.Control
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                    />
                  ) : (
                    <span className="fw-medium">
                      {user?.customer_name || "No registrado"}
                    </span>
                  )}
                </div>
              </Col>
              <Col xs={12} className="d-flex align-items-start gap-3">
                <FaPhone className="text-muted mt-2" />{" "}
                <div className="flex-grow-1">
                  <small className="d-block text-muted fw-bold text-uppercase">
                    Teléfono
                  </small>
                  {isEditing ? (
                    <Form.Control
                      type="text"
                      placeholder="+569..."
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                    />
                  ) : (
                    <span className="fw-medium">
                      {user?.phone || "Sin teléfono registrado"}
                    </span>
                  )}
                </div>
              </Col>
              {/* Campo Email */}
              <Col xs={12} className="d-flex align-items-start gap-3">
                <FaEnvelope className="text-muted mt-2" />
                <div className="flex-grow-1">
                  <small className="d-block text-muted fw-bold text-uppercase">
                    Email
                  </small>
                  <span className="fw-medium text-muted">{user?.email}</span>
                </div>
              </Col>

              {/* Campo Dirección */}
              <Col xs={12} className="d-flex align-items-start gap-3">
                <FaMapMarkerAlt className="text-muted mt-2" />
                <div className="flex-grow-1">
                  <small className="d-block text-muted fw-bold text-uppercase">
                    Dirección de Envío
                  </small>
                  {isEditing ? (
                    <Form.Control
                      as="textarea"
                      rows={2}
                      value={formData.shipping_address}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          shipping_address: e.target.value,
                        })
                      }
                    />
                  ) : (
                    <span className="fw-medium">
                      {user?.shipping_address || "Sin dirección registrada"}
                    </span>
                  )}
                </div>
              </Col>
            </Row>
            {isEditing && (
              <>
                <hr className="my-4 text-muted" />
                <Col xs={12} className="d-flex align-items-start gap-3">
                  <FaLock className="text-muted mt-2" />
                  <div className="flex-grow-1">
                    <small className="d-block text-muted fw-bold text-uppercase">
                      Cambiar Contraseña (Opcional)
                    </small>
                    <Form.Control
                      type="password"
                      placeholder="Nueva contraseña"
                      value={formData.password || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                    />
                    <Form.Text className="text-muted">
                      Déjalo en blanco si no deseas cambiarla.
                    </Form.Text>
                  </div>
                </Col>
              </>
            )}

            <div className="d-grid gap-2">
              {isEditing ? (
                <>
                  <Button
                    variant="dark"
                    className="rounded-pill py-2"
                    onClick={handleSave}
                  >
                    Guardar Cambios
                  </Button>
                  <Button
                    variant="light"
                    className="rounded-pill py-2"
                    onClick={() => setIsEditing(false)}
                  >
                    Cancelar
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="outline-dark"
                    className="rounded-pill py-2"
                    onClick={handleEditClick}
                  >
                    Editar Mis Datos
                  </Button>
                  <Button
                    variant="outline-secondary"
                    className="rounded-pill py-2 d-flex align-items-center justify-content-center gap-2"
                    onClick={() => navigate("/mis-reviews")}
                  >
                    <FaCommentDots /> Mis Testimonios
                  </Button>
                  <Button
                    variant="danger"
                    className="rounded-pill py-2 opacity-75"
                    onClick={handleLogout}
                  >
                    Cerrar Sesión
                  </Button>
                </>
              )}
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}
