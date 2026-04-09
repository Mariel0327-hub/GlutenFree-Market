import React, { useContext, useState, useEffect } from "react";
import { Container, Row, Col, Card, Modal, Button, Form } from "react-bootstrap";
import { ReviewContext } from "../context/ReviewContext";
import { FaStar, FaQuoteLeft, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import "../assets/css/Testimonials.css"

export default function AllTestimonials({ limit = false }) {
  // Busca estas líneas al principio de AllTestimonials y cámbialas por esta única:
const { reviews, addReview, token } = useContext(ReviewContext);

  // Estados para el Modal de Vista Detallada
  const [showDetail, setShowDetail] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);
  const [displayReviews, setDisplayReviews] = useState([]);

  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);

  const handleOpenDetail = (review) => {
    setSelectedReview(review);
    setShowDetail(true);
  };

  const handlePost = async () => {
    if (!comment.trim()) return;
    const payload = {
      id_product: null,
      about_product: false,
      review_title: "Opinión Comunidad",
      review_body: comment,
      rating: rating,
    };
    const result = await addReview(payload, token);
    if (result.success) {
      setComment(""); 
      setRating(5);
      Swal.fire(
        "¡Listo!",
        "Tu comentario ya es parte de la comunidad",
        "success",
      );
    }
  };
  //  filtrar/limitar reseñas
  useEffect(() => {
    if (reviews && reviews.length > 0) {
      const filtered = reviews.filter((r) => r.about_product === false);
      setDisplayReviews(
        limit
          ? [...filtered].sort(() => 0.5 - Math.random()).slice(0, 3)
          : reviews,
      );
    }
  }, [reviews, limit]);
  return (
    <>
      <Container className="py-5 mt-5">
        <h2 className="text-center titles-font fw-bold mb-5">
          Nuestra Comunidad
        </h2>
        {token && (
          <Row className="justify-content-center mb-5">
            <Col md={8} lg={6} className="bg-light p-4 rounded-4 shadow-sm">
              <Form.Control
                as="textarea"
                placeholder="Cuéntanos tu experiencia..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="mb-3 border-0"
              />
              <div className="d-flex justify-content-between align-items-center">
                <div className="text-warning">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <FaStar
                      key={n}
                      onClick={() => setRating(n)}
                      style={{ cursor: "pointer" }}
                      className={n <= rating ? "" : "opacity-25"}
                    />
                  ))}
                </div>
                <Button variant="dark" onClick={handlePost}>
                  Postear
                </Button>
              </div>
            </Col>
          </Row>
        )}
        <Row className="g-4">
          {displayReviews.map((t) => (
            <Col key={t.review_id} xs={12} md={6} lg={4}>
              <Card
                className="h-100 border-0 shadow-elegant rounded-4"
                onClick={() => handleOpenDetail(t)}
                style={{ cursor: "pointer" }}
              >
                <Card.Body className="p-4 d-flex flex-column details-modal">
                  <FaQuoteLeft
                    className="text-warning mb-3 opacity-50"
                    size={24}
                  />
                  <h6 className="fw-bold">{t.about_product}</h6>

                  <h6 className="fw-bold text-primary">
                    {t.about_product ? "Reseña de Producto" : "Opinión General"}
                  </h6>
                  <Card.Text className="body-font text-muted fst-italic mb-4 flex-grow-1">
                    "{t.review_body}"
                  </Card.Text>

                  <div className="d-flex align-items-center mt-3">
                    <img
                      src={t.avatar}
                      alt={t.author}
                      className="rounded-circle me-3 shadow-sm"
                      style={{
                        width: "50px",
                        height: "50px",
                        objectFit: "cover",
                        border: "2px solid #fff",
                      }}
                    />
                    <div>
                      <Card.Title className="fs-6 fw-bold mb-0">
                        {t.author}
                      </Card.Title>
                      <div className="text-warning small">
                        {[...Array(t.rating)].map((_, i) => (
                          <FaStar key={i} />
                        ))}
                      </div>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
        <Modal
          show={showDetail}
          onHide={() => setShowDetail(false)}
          centered
          size="lg"
          contentClassName="rounded-4 border-0 shadow"
        >
          {/* --- MODAL DE VISTA DETALLADA --- */}
          <Modal.Body className="p-5 details-modal ">
            <div className="d-flex justify-content-end">
              <Button
                variant="link"
                className="text-dark p-0"
                onClick={() => setShowDetail(false)}
              >
                <FaTimes size={20} />
              </Button>
            </div>

            {selectedReview && (
              <div className="text-center">
                <FaQuoteLeft
                  className="text-warning mb-4 opacity-25"
                  size={40}
                />
                <h3 className="titles-font fw-bold mb-3">
                  {selectedReview.about_product}
                </h3>

                <div className="text-warning mb-4">
                  {[...Array(selectedReview.rating)].map((_, i) => (
                    <FaStar key={i} size={20} />
                  ))}
                </div>

                <p className="fs-5 text-muted fst-italic lh-lg mb-5">
                  "{selectedReview.review_body}"
                </p>

                <hr className="my-4 opacity-25" />

                <div className="d-flex align-items-center justify-content-center">
                  <img
                    src={selectedReview.avatar}
                    className="rounded-circle me-3"
                    style={{
                      width: "60px",
                      height: "60px",
                      objectFit: "cover",
                    }}
                  />
                  <div className="text-start">
                    <h5 className="fw-bold mb-0">{selectedReview.author}</h5>
                    <small className="text-muted">Cliente Verificado</small>
                  </div>
                </div>
              </div>
            )}
          </Modal.Body>
        </Modal>
        {/* El botón solo aparece si estamos usando el límite (Home) */}
        {limit && (
          <div className="text-center mt-5">
            <Link
              to="/todos-los-testimonios"
              className="btn btn-dark rounded-pill px-5 shadow-sm py-2"
            >
              Ver todas las reseñas
            </Link>
          </div>
        )}
      </Container>
    </>
  );
}
