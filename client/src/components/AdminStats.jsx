import { Row, Col } from "react-bootstrap";

const AdminStats = ({ orders, products }) => {
  // Calculamos el total de ventas sumando los totales de cada orden
  const totalVentas = orders
    .reduce((acc, curr) => acc + Number(curr.total || 0), 0)
    .toLocaleString("es-CL");

  // Filtramos las órdenes que aún no han sido enviadas
  const pedidosPendientes = orders.filter(
    (o) => o.is_shipped === false || !o.is_shipped
  ).length;

  return (
    <Row className="mb-4 pt-2">
      {/* Card: Total Ventas */}
      <Col md={4} className="mb-3">
        <div className="dashboard-card text-center shadow-sm p-3 bg-white rounded border-bottom border-primary border-5">
          <h6 className="text-muted text-uppercase small fw-bold">Total Ventas</h6>
          <h3 className="fw-bold text-dark">
            ${totalVentas}
          </h3>
        </div>
      </Col>

      {/* Card: Pedidos Pendientes */}
      <Col md={4} className="mb-3">
        <div className="dashboard-card text-center shadow-sm p-3 bg-white rounded border-start border-warning border-5">
          <h6 className="text-muted text-uppercase small fw-bold">Pendientes</h6>
          <h3 className="fw-bold text-dark">
            {pedidosPendientes}
          </h3>
        </div>
      </Col>

      {/* Card: Stock en Neon */}
      <Col md={4} className="mb-3">
        <div className="dashboard-card text-center shadow-sm p-3 bg-white rounded border-start border-success border-5">
          <h6 className="text-muted text-uppercase small fw-bold">Productos en Neon</h6>
          <h3 className="fw-bold text-dark">
            {products.length}
          </h3>
        </div>
      </Col>
    </Row>
  );
};

export default AdminStats;