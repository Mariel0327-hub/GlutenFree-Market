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
              value={filters.category}
              onChange={handleChange}
              className="rounded-pill"
            >
              <option value="all">Todas</option>
              <option value="cat-panaderia">Panadería</option>
              <option value="cat-pastas">Pastas</option>
              <option value="cat-snacks">Snacks</option>
              <option value="cat-harinas">Harinas</option>
              <option value="cat-chocolate">Chocolate</option>
              <option value="cat-cafe">Café</option>
              <option value="cat-reposteria">Repostería</option>
              <option value="cat-bebidas">Bebidas</option>
              <option value="cat-granos">Granos</option>
              <option value="cat-cereales">Cereales</option>
            </Form.Select>
          </Form.Group>
        </Col>

        <Col md={4}>
          <Form.Group>
            <Form.Label className="small fw-bold">Ordenar Por</Form.Label>
            <Form.Select
              name="sortBy"
              value={filters.sortBy}
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
