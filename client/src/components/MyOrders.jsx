import { useContext, useState, useEffect } from "react";
import {
  Container,
  Table,
  Button,
  Badge,
  Card,
  Modal,
  ListGroup,
  Form,
} from "react-bootstrap";

import { FaEye, FaShoppingBag } from "react-icons/fa";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import { ReviewContext } from "../context/ReviewContext";
import { ProductContext } from "../context/ProductContext";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function MyOrders() {
  const { user, token } = useContext(UserContext);
  const { addReview } = useContext(ReviewContext);
  const navigate = useNavigate();
  const { products } = useContext(ProductContext);

  // --- ESTADOS ---
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false); // Modal de detalles
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Estados para la Reseña
  const [showReview, setShowReview] = useState(false); // Modal de calificación
  const [orderToReview, setOrderToReview] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  // --- FUNCIONES ---
  const fetchOrders = async () => {
    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const res = await axios.get(
        "http://localhost:3000/api/order/customer",
        config,
      );
      setOrders(res.data);
    } catch (error) {
      console.error("Error al obtener pedidos:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenReview = (order, item) => {
    setSelectedProduct(item);
    setOrderToReview(order);
    setRating(5);
    setComment("");
    setShowReview(true);
  };
  const { reviews } = useContext(ReviewContext);

  const handleSubmitReview = async () => {
    if (!comment.trim()) return alert("Escribe un comentario.");
    console.log("Producto seleccionado en el Modal:", selectedProduct);

    const payload = {
      id_product:
        selectedProduct?.product_id ||
        selectedProduct?.id_product ||
        selectedProduct?.id,
      about_product: true,
      review_title: "Reseña de producto",
      review_body: comment,
      rating: rating,
    };
    console.log("Enviando este payload:", payload);

    const result = await addReview(payload, token);

    if (result.success) {
      Swal.fire("¡Éxito!", "Testimonio publicado", "success");
      setShowReview(false);
      setShowModal(false);
    } else {
      Swal.fire("Error", "No se pudo publicar", "error");
    }
  };

  const getStatusBadge = (order) => {
    const isShipped = order.is_shipped === "t" || order.is_shipped === true;
    const isPaid = order.is_paid === "t" || order.is_paid === true;

    if (isShipped) {
      return (
        <Badge bg="success" className="rounded-pill px-3 shadow-sm">
          Entregado
        </Badge>
      );
    }
    if (isPaid) {
      return (
        <Badge bg="info" className="rounded-pill px-3 text-white shadow-sm">
          En proceso
        </Badge>
      );
    }
    return (
      <Badge bg="secondary" className="rounded-pill px-3 opacity-75">
        Pendiente
      </Badge>
    );
  };

  const handleShowDetails = async (order) => {
    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const res = await axios.get(
        `http://localhost:3000/api/order/customer/${order.order_total_id}/items`,
        config,
      );
      setSelectedOrder({ ...order, items: res.data });
      setShowModal(true);
    } catch (error) {
      setSelectedOrder(order);
      setShowModal(true);
      error.response?.status === 404
        ? alert("No se encontraron los detalles del pedido.")
        : alert("Error al cargar detalles del pedido.");
    }
  };

  useEffect(() => {
    if (token) fetchOrders();
  }, [token]);

  // --- RENDERIZADO ---
  if (loading)
    return <p className="text-center py-5">Cargando tus pedidos...</p>;

  if (orders.length === 0) {
    return (
      <Container className="py-5 text-center mt-5">
        <p className="text-muted">Aún no has realizado ningún pedido.</p>
      </Container>
    );
  }

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
                <th>ID Pedido</th>
                <th>Fecha</th>
                <th>Total</th>
                <th>Estado</th>
                <th className="text-center">Acción</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.order_total_id}>
                  <td className="fw-bold">
                    #{order.order_total_id.substring(0, 8)}...
                  </td>
                  <td>
                    <div className="d-flex flex-column">
                      <span>
                        {new Date(order.order_date).toLocaleDateString("es-CL")}
                      </span>
                      <small
                        className="text-muted"
                        style={{ fontSize: "0.7rem" }}
                      >
                        {new Date(order.order_date).toLocaleTimeString(
                          "es-CL",
                          { hour: "2-digit", minute: "2-digit" },
                        )}
                      </small>
                    </div>
                  </td>
                  <td>${Number(order.total).toLocaleString("es-CL")}</td>
                  <td>{getStatusBadge(order)}</td>
                  <td className="text-center">
                    <Button
                      variant="outline-dark"
                      size="sm"
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
        {/* Modal de Detalle */}
        <Modal show={showModal} onHide={() => setShowModal(false)} centered>
          <Modal.Header closeButton className="border-0">
            <Modal.Title className="fw-bold">
              Detalle Pedido #{selectedOrder?.order_total_id?.substring(0, 8)}
            </Modal.Title>
          </Modal.Header>

          <Modal.Body className="pt-0">
            <p className="text-muted mb-4 small">
              Realizado el {selectedOrder?.order_date}
            </p>

            <h6 className="fw-bold mb-3">
              <FaShoppingBag className="me-2" /> Productos:
            </h6>
            <ListGroup variant="flush">
              {selectedOrder?.items?.map((item) => {
                const alreadyReviewed = reviews.some((r) => {
                  // 1. Obtenemos el ID del producto que estamos iterando
                  const currentProductId = item.product_id || item.id_product;

                  // 2. Obtenemos el ID del usuario logueado
                  const currentUserId = user?.customer_id || user?.id;

                  return (
                    // El producto debe coincidir
                    r.id_product &&
                    String(r.id_product) === String(currentProductId) &&
                    // El autor de la reseña debe ser el usuario actual
                    String(r.id_customer) === String(currentUserId)
                  );
                });
                return (
                  <ListGroup.Item
                    key={item.order_item_id}
                    className="d-flex justify-content-between align-items-center px-0 py-3"
                  >
                    <div>
                      <span className="fw-bold d-block">{item.title}</span>
                      <span className="text-muted small">
                        ${Number(item.unit_price).toLocaleString("es-CL")} x{" "}
                        {item.quantity}
                      </span>
                    </div>
                    {(selectedOrder.is_shipped === true ||
                      selectedOrder.is_shipped === "t") &&
                      (alreadyReviewed ? (
                        <div className="d-flex flex-column align-items-end">
                          <Badge
                            bg="light"
                            className="text-success border border-success rounded-pill px-3"
                          >
                            ✓ Calificado
                          </Badge>
                        </div>
                      ) : (
                        <Button
                          variant="warning"
                          size="sm"
                          className="rounded-pill px-3 fw-bold shadow-sm"
                          onClick={() => handleOpenReview(selectedOrder, item)}
                        >
                          ⭐ Calificar
                        </Button>
                      ))}
                  </ListGroup.Item>
                );
              })}
            </ListGroup>
            <div className="d-flex justify-content-between fw-bold fs-5 pt-3 border-top mt-3">
              <span>Total:</span>
              <span>
                ${Number(selectedOrder?.total).toLocaleString("es-CL")}
              </span>
            </div>
          </Modal.Body>

          <Modal.Footer className="border-0">
            <Button
              variant="dark"
              className="w-100 rounded-pill"
              onClick={() => setShowModal(false)}
            >
              Cerrar
            </Button>
          </Modal.Footer>
        </Modal>
        {/* Modal de Calificar Pedido*/}
        <Modal show={showReview} onHide={() => setShowReview(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Calificar Pedido</Modal.Title>
          </Modal.Header>
          <Modal.Body className="text-center">
            <p>
              ¿Qué te pareció el producto{" "}
              <strong>{selectedProduct?.title}</strong>?
            </p>

            {/* Estrellas */}
            <div className="mb-3 h3 text-warning">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  style={{ cursor: "pointer" }}
                  onClick={() => setRating(star)}
                >
                  {star <= rating ? "★" : "☆"}
                </span>
              ))}
            </div>

            {/* Input de texto */}
            <Form.Group>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Escribe tu reseña aquí..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowReview(false)}>
              Cerrar
            </Button>
            <Button variant="dark" onClick={handleSubmitReview}>
              Publicar
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </>
  );
}
