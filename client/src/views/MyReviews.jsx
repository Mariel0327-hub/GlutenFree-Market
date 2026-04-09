import React, { useContext, useState } from "react";
import {
  Container,
  Card,
  Button,
  Modal,
  Form,
  Row,
  Col,
} from "react-bootstrap";
import { ReviewContext } from "../context/ReviewContext";
import { ProductContext } from "../context/ProductContext"; // Importante para los nombres
import { FaRegEdit, FaTrashAlt, FaStar, FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function MyReviews() {
  const { myReviews, deleteReview, updateReview, token } =
    useContext(ReviewContext);
  const { products } = useContext(ProductContext); // Consumimos productos
  const navigate = useNavigate();

  // Estados para el Modal
  const [showEdit, setShowEdit] = useState(false);
  const [currentReview, setCurrentReview] = useState(null);
  const [editBody, setEditBody] = useState("");
  const [editRating, setEditRating] = useState(5);

  
  const handleEditClick = (review) => {
    setCurrentReview(review);
    setEditBody(review.review_body);
    setEditRating(review.rating);
    setShowEdit(true);
  };

  const handleSaveEdit = async () => {
    try {
      await updateReview(currentReview.review_id, {
        review_body: editBody,
        rating: editRating,
        review_title: currentReview.review_title,
        id_product: currentReview.id_product,
        about_product: currentReview.about_product,
      });

      setShowEdit(false);
      Swal.fire({
        icon: "success",
        title: "Reseña actualizada",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      Swal.fire("Error", "No se pudo actualizar", error);
    }
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "¿Eliminar testimonio?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Sí, borrar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteReview(id);
        Swal.fire("Borrado", "Tu reseña ha sido eliminada", "success");
      }
    });
  };

  return (
    <>
      <div className="banner-divider-card" style={{ height: "50px" }}></div>
      <Container className="py-5">
        <div className="d-flex align-items-center mb-4">
          <Button
            variant="link"
            className="text-dark p-0 me-3 bg-transparent border-0"
            onClick={() => navigate(-1)}
          >
            <FaArrowLeft size={20} />
          </Button>
          <h2 className="fw-bold m-0">Mis Testimonios ({myReviews.length})</h2>
        </div>

        <Row className="g-4">
          {myReviews.length === 0 ? (
            <Col>
              <p>No tienes testimonios aún.</p>
            </Col>
          ) : (
            myReviews.map((t) => {
              // Buscamos el nombre real del producto en el catálogo
              const product = products?.find(
                (p) => String(p.product_id) === String(t.id_product),
              );

              return (
                <Col xs={12} key={t.review_id}>
                  <Card className="border-0 shadow-sm rounded-4 p-3">
                    <Card.Body className="d-flex justify-content-between align-items-center">
                      <div>
                        <h6 className="fw-bold mb-1">
                          {product ? product.title : "Producto"}
                        </h6>
                        <p className="text-muted mb-2 fst-italic">
                          "{t.review_body}"
                        </p>
                        <div className="d-flex align-items-center">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <FaStar
                              key={star}
                              style={{
                                color: star <= t.rating ? "#ffc107" : "#e4e5e9",
                              }}
                              size={16}
                            />
                          ))}
                        </div>
                      </div>
                      <div className="d-flex gap-2">
                        <Button
                          variant="outline-dark"
                          size="sm"
                          className="border-0"
                          onClick={() => handleEditClick(t)}
                        >
                          <FaRegEdit size={20} />
                        </Button>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          className="border-0"
                          onClick={() => handleDelete(t.review_id)}
                        >
                          <FaTrashAlt size={20} />
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })
          )}
        </Row>

        {/* Modal de Edición idéntico al que tenías */}
        <Modal show={showEdit} onHide={() => setShowEdit(false)} centered>
          <Modal.Header closeButton className="border-0">
            <Modal.Title className="fw-bold">Editar Reseña</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Tu comentario</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={editBody}
                onChange={(e) => setEditBody(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Calificación</Form.Label>
              <Form.Select
                value={editRating}
                onChange={(e) => setEditRating(Number(e.target.value))}
              >
                {[5, 4, 3, 2, 1].map((n) => (
                  <option key={n} value={n}>
                    {n} Estrellas
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer className="border-0">
            <Button variant="light" onClick={() => setShowEdit(false)}>
              Cancelar
            </Button>
            <Button variant="dark" onClick={handleSaveEdit}>
              Guardar Cambios
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </>
  );
}
