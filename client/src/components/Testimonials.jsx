import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaStar, FaQuoteLeft } from "react-icons/fa";
import "../assets/css/Testimonials.css";
import { ReviewContext } from "../context/ReviewContext";
import { useContext } from "react";

export default function Testimonials() {
  const { reviews } = useContext(ReviewContext);
  return (
    <section className="testimonials-wrapper py-5">
      <Container>
        <div className="text-center mb-5">
          <h2 className="titles-font fw-bold">Testimonios</h2>
          <h2 className="titles-font fw-bold">¿Qué dice nuestros clientes?</h2>
          <div className="title-underline mx-auto"></div>
        </div>

        <Row className="g-4">
          {reviews.slice(0, 3).map((t) => (
            <Col key={t.review_id} xs={12} md={4}>
              <Card className="h-100 border-0 shadow-elegant rounded-4">
                <Card.Body className="p-4 d-flex flex-column">
                  <FaQuoteLeft
                    className="text-warning mb-3 opacity-50"
                    size={24}
                  />
                  <h6 className="fw-bold">{t.about_product}</h6>

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
                        {t.author}{" "}
                        {/* En el futuro será t.customer_name si hacemos un JOIN */}
                      </Card.Title>
                      <div className="text-warning small">
                        {[...Array(Number(t.rating) || 0)].map((_, i) => (
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
        {/* 🆕 BOTÓN PARA VER TODO */}
        <div className="text-center mt-5">
          <Link
            to="/todos-los-testimonios"
            className="btn btn-outline-dark px-5 rounded-pill fw-bold shadow-sm"
          >
            Ver todas las reseñas
          </Link>
        </div>
      </Container>
    </section>
  );
}
