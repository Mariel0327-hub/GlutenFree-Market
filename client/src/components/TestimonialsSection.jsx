import React, { useState } from "react";
import { Row, Col, Card, Form, Button } from "react-bootstrap";
import { FaStar, FaUserCircle, FaPaperPlane } from "react-icons/fa";

export default function TestimonialsSection() {
  // por el momentoi estoy usando esto luego traere los comentarios de la base de datos
  const [reviews, setReviews] = useState([
    {
      id: 1,
      user: "@Rodrigo_fab_v",
      comment: "¡Increíble sabor! Muy recomendado.",
      stars: 5,
    },
    {
      id: 2,
      user: "@Maria_G",
      comment: "Me encantó la textura, volveré a comprar.",
      stars: 4,
    },
  ]);

  const [newComment, setNewComment] = useState("");
  const [rating, setRating] = useState(5);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const review = {
      id: Date.now(),
      user: "@Usuario_Actual", // Aquí usarás el nombre del usuario logueado
      comment: newComment,
      stars: rating,
    };

    setReviews([review, ...reviews]);
    setNewComment("");
  };

  return (
    <div className="border-top">
      <h3 className="titles-font mb-4" style={{ color: "#3e2723" }}>
        Reseñas de Clientes
      </h3>

      <Row>
        {/* Lista de Testimonios */}
        <Col lg={7}>
          <div
            className="reviews-list pe-lg-4"
            style={{ maxHeight: "400px", overflowY: "auto" }}
          >
            {reviews.map((r) => (
              <Card key={r.id} className="mb-3 border-0 shadow-sm rounded-4">
                <Card.Body className="d-flex gap-3">
                  <FaUserCircle size={40} className="text-muted" />
                  <div>
                    <h6 className="fw-bold mb-1">{r.user}</h6>
                    <div className="text-warning small mb-2">
                      {[...Array(r.stars)].map((_, i) => (
                        <FaStar key={i} />
                      ))}
                    </div>
                    <p className="text-muted small mb-0">{r.comment}</p>
                  </div>
                </Card.Body>
              </Card>
            ))}
          </div>
        </Col>

        {/* Formulario de "Agrega un testimonio" */}
        <Col lg={5}>
          <Card
            className="border-0 rounded-4 p-3"
            style={{ backgroundColor: "#f0f4f8" }}
          >
            <Card.Body>
              <h5 className="fw-bold mb-3">Cuéntanos tu experiencia</h5>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label className="small fw-bold">
                    Calificación
                  </Form.Label>
                  <Form.Select
                    size="sm"
                    value={rating}
                    onChange={(e) => setRating(Number(e.target.value))}
                    className="rounded-pill"
                  >
                    <option value="5">5 Estrellas - Excelente</option>
                    <option value="4">4 Estrellas - Muy Bueno</option>
                    <option value="3">3 Estrellas - Bueno</option>
                    <option value="2">2 Estrellas - Regular</option>
                    <option value="1">1 Estrella - Malo</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Escribe tu comentario aquí..."
                    className="rounded-3 border-0"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                  />
                </Form.Group>

                <Button
                  type="submit"
                  className="w-100 rounded-pill btn-order-now border-0 py-2 d-flex align-items-center justify-content-center gap-2"
                >
                  <FaPaperPlane size={14} /> Enviar Reseña
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
