import React, { useContext, useState } from "react";
import { Container, Row, Col, Card, Modal, Button } from "react-bootstrap";
import { ReviewContext } from "../context/ReviewContext";
import { FaStar, FaQuoteLeft, FaTimes } from "react-icons/fa";

export default function AllTestimonials() {
  const { reviews } = useContext(ReviewContext); // Consumimos TODO el array

  // Estados para el Modal de Vista Detallada
  const [showDetail, setShowDetail] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);

  const handleOpenDetail = (review) => {
    setSelectedReview(review);
    setShowDetail(true);
  };

  return (
    <>
      <div className="banner-divider-card"></div>
      <Container className="py-5 mt-5">
        <h2 className="text-center titles-font fw-bold mb-5">
          Nuestra Comunidad
        </h2>
        <Row className="g-4">
          {reviews.map((t) => (
            <Col key={t.review_id} xs={12} md={6} lg={4}>
              <Card
                className="h-100 border-0 shadow-elegant rounded-4"
                onClick={() => handleOpenDetail(t)}
                style={{ cursor: "pointer" }}
              >
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
          <Modal.Body className="p-5">
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
      </Container>
    </>
  );
}
