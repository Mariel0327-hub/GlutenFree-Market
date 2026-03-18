import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "../assets/css/Footer.css";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaLinkedin,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer
      id="footer-section"
      className="py-5 footer-custom pt-5 pb-3 container-footer"
      style={{ backgroundColor: "var(--color-bgFooter)" }}
    >
      <Container className=" border border-dark p-5 ">
        <Row className="row-cols-1 row-cols-md-3">
          <Col id="contacto" className="border ">
            <h4 className="titles-font fw-bold mb-4">GlutenFree</h4>
            <h5 className="fw-bold mb-4 footer-title">Contáctanos</h5>
            <ul className="list-unstyled footer-list">
              <li>
                <FaMapMarkerAlt className="me-2" /> Av. Providencia 1234,
                Santiago
              </li>
              <li>
                <FaPhoneAlt className="me-2" /> +56 9 1234 5678
              </li>
              <li>
                <FaEnvelope className="me-2" /> contacto@glutenfree.cl
              </li>
            </ul>
            <p className="text-muted small">
              Horarios de atención:
              <br />
              Lunes a viernes de 09:30 a 17:00 hrs
            </p>
            <div className="d-flex gap-3 mt-3">
              <FaFacebook size={24} className="text-secondary" />
              <FaLinkedin size={24} className="text-secondary" />
              <FaTwitter size={24} className="text-secondary" />
              <FaInstagram size={24} className="text-secondary" />
            </div>
          </Col>

          {/* Columna Productos */}
          <Col className="border">
            <h5 className="fw-bold mb-4 footer-title">Productos</h5>
            <ul className="list-unstyled footer-list">
              <li>
                <a href="#!">Panadería</a>
              </li>
              <li>
                <a href="#!">Pastas</a>
              </li>
              <li>
                <a href="#!">Snacks</a>
              </li>
              <li>
                <a href="#!">Repostería</a>
              </li>
            </ul>
          </Col>

          {/* Columna Nosotros (Reseña) */}
          <Col className="footer-column-nosotros border " id="nosotros">
            <h5 className="footer-title fw-bold text-start">Nuestra Misión</h5>
            <p className="text-muted">
              En <strong>GlutenFree Market</strong>, creemos que una dieta sin
              gluten no debe ser sinónimo de límites. Nacimos para simplificar
              la vida de la comunidad celíaca, seleccionando productos con
              certificaciones de calidad y un sabor excepcional. Somos tu aliado
              consciente en cada bocado.
            </p>
          </Col>
        </Row>
        <hr className="my-5 opacity-25" />
        <Row>
          <Col className="text-center small text-muted">
            <p>
              &copy; {new Date().getFullYear()} GlutenFree Market - Todos los
              derechos reservados.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}
