import React from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import "../assets/css/ImageGallery.css";
import image1 from "../assets/imgs/image-gallery-1.jpg";
import image2 from "../assets/imgs/image-gallery-2.jpg";
import image3 from "../assets/imgs/image-gallery-3.jpg";
import image4 from "../assets/imgs/image-gallery-4.jpg";

export default function ImgGallery() {
  return (
    <Container fluid className="p-0 gallery-container my-5">
      <Row className="g-0">
        {" "}
        {/* Mantenemos g-0 para ese look infinito */}
        <Col xs={6} md={3} className="gallery-overflow">
          <div className="image-wrapper">
            <Image src={image1} fluid className="h-100 object-fit-cover" />
          </div>
        </Col>
        <Col xs={6} md={3} className="gallery-overflow">
          <div className="image-wrapper">
            <Image src={image2} fluid className="h-100 object-fit-cover" />
          </div>
        </Col>
        <Col xs={6} md={3} className="gallery-overflow">
          <div className="image-wrapper">
            <Image src={image3} fluid className="h-100 object-fit-cover" />
          </div>
        </Col>
        <Col xs={6} md={3} className="gallery-overflow">
          <div className="image-wrapper">
            <Image src={image4} fluid className="h-100 object-fit-cover" />
          </div>
        </Col>
      </Row>
    </Container>
  );
}
