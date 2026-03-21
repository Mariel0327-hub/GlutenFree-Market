import {
  Container,
  Table,
  Badge,
  Card,
  Button,
  Modal,
  ListGroup,
} from "react-bootstrap";
import { useContext, useState } from "react";
import { OrderContext } from "../context/OrderContext";
import { FaEye, FaShoppingBag, FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function MyOrders() {
  const { orders } = useContext(OrderContext);
  const [showModal, setShowModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const navigate = useNavigate();

  // 1. Validación de "Sin Pedidos"
  if (!orders || orders.length === 0) {
    return (
      <Container className="py-5 text-center mt-5">
        <div
          className="p-5 shadow-elegant rounded-4 bg-white mx-auto"
          style={{ maxWidth: "500px" }}
        >
          <FaShoppingBag size={50} className="text-muted mb-3 opacity-25" />
          <h2 className="titles-font fw-bold mb-3">Aún no hay pedidos</h2>
          <p className="text-muted mb-4">
            Cuando realices tu primera compra, aparecerá en esta sección.
          </p>
          <Button
            variant="dark"
            className="rounded-pill px-4"
            onClick={() => navigate("/productos")}
          >
            Ir a la tienda
          </Button>
        </div>
      </Container>
    );
  }

  const getStatusBadge = (status) => {
    const configs = {
      "En camino": { bg: "warning", text: "dark" },
      Entregado: { bg: "success", text: "white" },
      Cancelado: { bg: "danger", text: "white" },
      Pendiente: { bg: "info", text: "dark" },
    };
    const config = configs[status] || { bg: "secondary", text: "white" };
    return (
      <Badge bg={config.bg} text={config.text} className="rounded-pill px-3">
        {status}
      </Badge>
    );
  };

  const handleShowDetails = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  return (
    <>
      <div className="banner-divider-card"></div>
      <Container className="py-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="fw-bold titles-font">Mis Pedidos</h2>
          <Badge bg="dark" className="rounded-pill px-3">
            Total: {orders.length}
          </Badge>
        </div>

        <Card className="shadow-elegant border-0 rounded-4 overflow-hidden">
          <Table hover responsive className="mb-0 align-middle">
            <thead className="bg-light">
              <tr>
                <th className="px-4 py-3 border-0">ID Pedido</th>
                <th className="border-0">Fecha</th>
                <th className="border-0">Total</th>
                <th className="border-0">Estado</th>
                <th className="text-center border-0">Acción</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.order_id}>
                  <td className="px-4 fw-bold text-secondary">
                    #{order.order_id}
                  </td>
                  <td className="text-muted">{order.date}</td>
                  <td className="fw-bold">
                    ${Number(order.total).toLocaleString("es-CL")}
                  </td>
                  <td>{getStatusBadge(order.status)}</td>
                  <td className="text-center">
                    <Button
                      variant="outline-dark"
                      size="sm"
                      className="rounded-pill px-3 d-inline-flex align-items-center gap-2"
                      onClick={() => handleShowDetails(order)}
                    >
                      <FaEye className="me-1" /> Ver detalle
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card>

        <Modal
          show={showModal}
          onHide={() => setShowModal(false)}
          centered
          size="md"
        >
          <Modal.Header closeButton className="border-0">
            <Modal.Title className="fw-bold">
              Detalle Pedido #{selectedOrder?.order_id}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="pt-0">
            <p className="text-muted mb-4 small">
              Realizado el {selectedOrder?.date}
            </p>

            <h6 className="fw-bold mb-3">
              <FaShoppingBag className="me-2" />
              Productos comprados:
            </h6>
            <ListGroup variant="flush" className="mb-4">
              {selectedOrder?.items.map((item) => (
                <ListGroup.Item
                  key={item.product_id}
                  className="d-flex justify-content-between align-items-center px-0 py-3"
                >
                  <div>
                    <span className="fw-bold d-block">{item.title}</span>
                    <span className="text-muted small">
                      ${Number(item.price).toLocaleString("es-CL")}
                    </span>
                  </div>

                  {selectedOrder?.status === "Entregado" ? (
                    <Button
                      variant="warning"
                      size="sm"
                      className="rounded-pill fw-bold small shadow-sm"
                      onClick={() => navigate(`/producto/${item.product_id}`)}
                    >
                      <FaStar className="me-1" /> Calificar
                    </Button>
                  ) : (
                    <Badge bg="light" text="dark" className="border">
                      Esperando entrega
                    </Badge>
                  )}
                </ListGroup.Item>
              ))}
            </ListGroup>

            <div className="d-flex justify-content-between fw-bold fs-5 pt-3 border-top">
              <span>Total:</span>
              <span>
                ${Number(selectedOrder?.total).toLocaleString("es-CL")}
              </span>
            </div>
          </Modal.Body>
          <Modal.Footer className="border-0">
            <Button
              variant="dark"
              className="w-100 rounded-pill py-2"
              onClick={() => setShowModal(false)}
            >
              Cerrar
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </>
  );
}
