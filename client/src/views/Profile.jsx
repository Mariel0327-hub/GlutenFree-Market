import React, { useContext, useState } from "react";
import { Container, Card, Button, Row, Col, Form } from "react-bootstrap";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

import {
  FaUserCircle,
  FaEnvelope,
  FaMapMarkerAlt,
  FaUserEdit,
  FaCalendarAlt,
  FaCommentDots,
} from "react-icons/fa";
import Swal from "sweetalert2";

export default function Profile() {
  const { user, logout, updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  // Estado para controlar si estamos editando
  const [isEditing, setIsEditing] = useState(false);
  // Estado local para los inputs del formulario
  const [formData, setFormData] = useState({ name: "", shipping_address: "" });
  const handleEditClick = () => {
    setFormData({
      name: user?.name || "",
      shipping_address: user?.shipping_address || "",
    });
    setIsEditing(true);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleSave = async () => {
    try {
      // 🚀 Llamamos a la función del contexto que creamos
      const result = await updateUser(formData);

      if (result.success) {
        setIsEditing(false);
        Swal.fire({
          icon: "success",
          title: "¡Actualizado!",
          text: "Tus datos se han guardado con éxito.",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      Swal.fire("Error", "No se pudieron actualizar los datos", error);
    }
  };

  return (
    <Container className="py-5 d-flex justify-content-center">
      <Card
        className="shadow-sm border-0 rounded-4 p-4"
        style={{ maxWidth: "550px", width: "100%" }}
      >
        <Card.Body>
          {user?.avatar_url ? (
            <img
              src={user.avatar_url}
              alt="Avatar"
              className="rounded-circle shadow-sm border"
              style={{ width: "100px", height: "100px", objectFit: "cover" }}
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/100";
              }} // Fallback por si el link falla
            />
          ) : (
            <FaUserCircle size={80} className="text-secondary opacity-50" />
          )}

          <h2 className="fw-bold mt-3" style={{ color: "#3e2723" }}>
            {isEditing ? "Editar Perfil" : "Mi Perfil"}
          </h2>
          <Form>
            <Row className="g-4 mb-4">
              {/* Campo Nombre (Editable) */}
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
                      disabled={!isEditing}
                    />
                  ) : (
                    <span className="fw-medium">
                      {user?.name || "No registrado"}
                    </span>
                  )}
                </div>
              </Col>

              {/* Campo Email (Solo lectura por seguridad) */}
              <Col xs={12} className="d-flex align-items-start gap-3">
                <FaEnvelope className="text-muted mt-2" />
                <div className="flex-grow-1">
                  <small className="d-block text-muted fw-bold text-uppercase">
                    Email
                  </small>
                  <span className="fw-medium text-muted">{user?.email}</span>
                </div>
              </Col>

              {/* Campo Dirección (Editable) */}
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
                    onClick={() => navigate("/mis-testimonios")}
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
