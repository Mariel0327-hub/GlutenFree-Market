import { Form, Row, Col } from "react-bootstrap";
import { ProductContext } from "../context/ProductContext";
import { useContext } from "react";

export default function ProductFilters() {
  const { filters, setFilters } = useContext(ProductContext);

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-white p-3 rounded-4 shadow-elegant mb-4">
      <Row className="align-items-center">
        <Col md={4}>
          <Form.Group>
            <Form.Label className="small fw-bold">Categoría</Form.Label>
            <Form.Select
              name="category"
              onChange={handleChange}
              className="rounded-pill"
            >
              <option value="All">Todas</option>
              <option value="Panadería">Panadería</option>
              <option value="Pastas">Pastas</option>
              <option value="Snacks">Snacks</option>
              <option value="Harinas">Harinas</option>
              <option value="Chocolate">Chocolate</option>
              <option value="Café">Café</option>
              <option value="Repostería">Repostería</option>
              <option value="Bebídas">Bebídas</option>
              <option value="Granos">Granos</option>
              <option value="Cereales">Cereales</option>
            </Form.Select>
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group>
            <Form.Label className="small fw-bold">Ordenar Por</Form.Label>
            <Form.Select
              name="sortBy"
              onChange={handleChange}
              className="rounded-pill"
            >
              <option value="default">Relevancia</option>
              <option value="low">Precio: Menor a Mayor</option>
              <option value="high">Precio: Mayor a Menor</option>
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>
    </div>
  );
}
