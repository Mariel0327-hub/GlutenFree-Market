import React from "react";
import { Container, Row, Col, Form, Button, InputGroup } from "react-bootstrap";
import "../assets/css/Newsletter.css";

export default function Newsletter() {
  return (
    <section className="newsletter-section py-5 my-5">
      <Container>
        <Row className="justify-content-center">
          <Col md={8} lg={6} className="text-center">
            <p
              className="text-muted text-uppercase small mb-2"
              style={{ letterSpacing: "2px" }}
            >
              Ponte en contacto
            </p>
            <h2 className="titles-font fw-bold mb-4">
              Suscríbete a nuestro boletín informativo
            </h2>
            <p className="text-muted mb-4">
              Mantente informado sobre nuevos productos 100% libres de gluten y
              actualizaciones de stock.
            </p>

            <Form>
              <InputGroup className="mb-3 shadow-sm rounded-pill overflow-hidden border">
                <Form.Control
                  placeholder="Tu correo electrónico"
                  aria-label="Email"
                  className="border-0 px-4 py-3"
                  type="email"
                  required
                />
                <Button
                  variant="light"
                  className="px-4 fw-bold border-0 rounded-0 rounded-end newsletter-btn"
                >
                  Suscribirse
                </Button>
              </InputGroup>
              <Form.Text className="text-muted small">
                No compartiremos tu información con terceros.
              </Form.Text>
            </Form>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
