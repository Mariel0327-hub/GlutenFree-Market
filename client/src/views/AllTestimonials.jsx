import React, { useContext, useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Modal,
  Button,
  Form,
} from "react-bootstrap";
import { ReviewContext } from "../context/ReviewContext";
import { FaStar, FaQuoteLeft, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import "../assets/css/Testimonials.css";

export default function AllTestimonials({ limit = false }) {
  const { reviews, addReview, token} = useContext(ReviewContext);

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
      id_product: "prod-000",
      about_product: false,
      review_title: "Opinión Comunidad",
      review_body: comment,
      rating: Number(rating),
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
  // console.log("Enviando reseña con token:", token);
  //  filtrar/limitar reseñas
  useEffect(() => {
    if (reviews && reviews.length > 0) {
      // Filtrar por opiniones generales (about_product: false)
      const filtered = reviews.filter((r) => r.about_product === false);
      setDisplayReviews(
        limit
          ? [...filtered].sort(() => 0.5 - Math.random()).slice(0, 3) // Aumentamos a 6 para llenar más espacio
          : reviews,
      );
    }
  }, [reviews, limit]);

  return (
    <>
      <Container className="py-5">
        <h2
          className="text-center titles-font fw-bold mb-5"
          style={{ fontFamily: "Quicksand" }}
        >
          Nuestra Comunidad
        </h2>

        {token && (
          <Row className="justify-content-center mb-5">
            <Col
              xs={12}
              sm={6}
              lg={4}
              className="bg-white p-4 rounded-4 shadow-sm border"
            >
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Cuéntanos tu experiencia..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="mb-3 border-0 bg-light"
              />
              <div className="d-flex justify-content-between align-items-center">
                <div className="text-warning fs-5">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <FaStar
                      key={n}
                      onClick={() => setRating(n)}
                      style={{ cursor: "pointer" }}
                      className={n <= rating ? "" : "opacity-25"}
                    />
                  ))}
                </div>
                <Button
                  variant="dark"
                  onClick={handlePost}
                  className="rounded-pill px-4"
                >
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
                className="h-100 border-0 shadow-sm rounded-4 p-3 transition-hover bg-white"
                onClick={() => handleOpenDetail(t)}
                style={{ cursor: "pointer" }}
              >
                <Card.Body className="d-flex flex-column">
                  {/* Icono de comillas para llenar el espacio superior */}
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <div className="text-warning small">
                      {[...Array(t.rating)].map((_, i) => (
                        <FaStar key={i} />
                      ))}
                    </div>
                  </div>

                  <Card.Text
                    className="text-muted fst-italic mb-4 flex-grow-1"
                    style={{ fontSize: "0.95rem" }}
                  >
                    "{t.review_body}"
                  </Card.Text>

                  <div className="mt-auto pt-3 border-top">
                    <div className="d-flex align-items-center">
                      <div>
                        <small
                          className="text-success"
                          style={{ fontSize: "0.75rem" }}
                        >
                          Cliente Verificado
                        </small>
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
                  <div className="text-start">
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
