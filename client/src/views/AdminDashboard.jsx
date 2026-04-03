import { useState, useEffect } from "react";
import {
  Container,
  Table,
  Button,
  Badge,
  Modal,
  Form,
  Card,
  Row,
  Col,
  InputGroup,
} from "react-bootstrap";
import Swal from "sweetalert2";
import { productsData } from "../data/products";

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [show, setShow] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showProdModal, setShowProdModal] = useState(false);

  const [newProd, setNewProd] = useState({
    title: "",
    price: "",
    image_url: "",
    description: "",
    category: "Sin categoría",
  });
  const cargarDatosDesdeNeon = () => {
    setProducts(productsData);

    const ordenesLocales = [
      {
        id: 1,
        customer: "Ignacio Pérez",
        total: 25990,
        date: "2026-04-01",
        status: "Enviado",
      },
      {
        id: 2,
        customer: "Elena Soto",
        total: 15400,
        date: "2026-04-02",
        status: "Pendiente",
      },
      {
        id: 3,
        customer: "Marcos Ruiz",
        total: 42000,
        date: "2026-04-03",
        status: "Pendiente",
      },
    ];

    setOrders(ordenesLocales);
  };
  useEffect(() => {
    cargarDatosDesdeNeon();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClose = () => {
    setShow(false);
    setEditingOrder(null);
  };

  const handleShow = (order = null) => {
    setEditingOrder(
      order || {
        id: Date.now().toString(),
        customer: "",
        total: "",
        status: "Pendiente",
        date: new Date().toISOString().split("T")[0],
      },
    );
    setShow(true);
  };

  const saveOrder = () => {
    if (!editingOrder.customer || !editingOrder.total) {
      return Swal.fire("Error", "Completa todos los campos", "error");
    }

    if (orders.find((o) => o.id === editingOrder.id)) {
      setOrders(
        orders.map((o) => (o.id === editingOrder.id ? editingOrder : o)),
      );
    } else {
      setOrders([...orders, editingOrder]);
    }
    handleClose();
    Swal.fire("¡Éxito!", "Pedido guardado localmente", "success");
  };

  const filteredOrders = orders.filter((o) =>
    o.customer.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleEditProduct = (product) => {
    setNewProd(product);
    setShowProdModal(true);
  };

  const saveProduct = () => {
    if (!newProd.title || !newProd.price) {
      return Swal.fire("Error", "El nombre y precio son obligatorios", "error");
    }

    const esEdicion = products.find((p) => p.product_id === newProd.product_id);

    if (esEdicion) {
      setProducts(
        products.map((p) =>
          p.product_id === newProd.product_id ? newProd : p,
        ),
      );
    } else {
      // Generamos un ID local si es nuevo
      const nuevoConId = { ...newProd, product_id: Date.now() };
      setProducts([...products, nuevoConId]);
    }

    setShowProdModal(false);
    Swal.fire("¡Éxito!", "Producto actualizado localmente", "success");
  };

  // Eliminar producto
  const deleteOrder = async (id) => {
    const result = await Swal.fire({
      title: "¿Eliminar pedido?",
      text: "Esta acción solo afectará a la vista actual.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, borrar",
    });

    if (result.isConfirmed) {
      // Solo actualizamos el estado local
      setOrders(orders.filter((o) => o.id !== id));
      Swal.fire("Eliminado", "Pedido quitado de la lista", "success");
    }
  };

  const deleteProduct = async (id) => {
    const result = await Swal.fire({
      title: "¿Eliminar producto?",
      text: "Esta acción solo afectará a la vista actual del panel.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, quitar",
    });

    if (result.isConfirmed) {
      setProducts(products.filter((p) => (p.product_id || p.id) !== id));

      Swal.fire("Eliminado", "Producto quitado de la lista", "success");
    }
  };

  return (
    <Container className="py-5">
      <Card className="shadow-sm border-0">
        <Card.Body>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 style={{ color: "#6c5b4b" }}>📦 Panel de Pedidos</h2>
            <Button
              variant="primary"
              onClick={() => handleShow()}
              style={{ backgroundColor: "#6c5b4b", border: "none" }}
            >
              + Crear Pedido
            </Button>
          </div>

          <InputGroup className="mb-3">
            <Form.Control
              placeholder="Buscar por cliente..."
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </InputGroup>

          <Table responsive hover>
            <thead
              className="bg-light text-muted uppercase"
              style={{ fontSize: "0.75rem", letterSpacing: "1px" }}
            >
              <tr>
                <th className="border-0">ID ORDEN</th>
                <th className="border-0">CLIENTE</th>
                <th className="border-0">FECHA</th>
                <th className="border-0 text-start">TOTAL</th>
                <th className="border-0 text-start">ESTADO</th>
                <th className="border-0 text-start">ACCIONES</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={`order-${order.order_total_id || order.id}`}>
                  <td>#{order.order_total_id || order.id}</td>
                  <td>{order.customer_name || order.customer}</td>
                  <td>{order.order_date || order.date}</td>
                  <td>${order.total}</td>
                  <td>
                    <Badge
                      pill
                      bg={order.status === "Enviado" ? "success" : "warning"}
                      className="px-3 py-2" // Más relleno para que respire
                      style={{ fontSize: "0.85rem", fontWeight: "500" }}
                    >
                      {order.status === "Enviado" ? "● Enviado" : "○ Pendiente"}
                    </Badge>
                  </td>
                  <td>
                    <Button
                      variant="light"
                      className="btn-action edit-btn me-2"
                      onClick={() => handleShow(order)}
                    >
                      ✏️
                    </Button>

                    <Button
                      variant="light"
                      className="btn-action delete-btn"
                      onClick={() => deleteOrder(order.id)}
                    >
                      🗑️
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
      <Row className="mb-4 pt-5">
        <Col md={4}>
          <div className="dashboard-card text-center">
            <h6 className="text-muted">Total Ventas</h6>
            <h3>
              $
              {orders
                .reduce((acc, curr) => acc + curr.total, 0)
                .toLocaleString()}
            </h3>
          </div>
        </Col>
        <Col md={4}>
          <div className="dashboard-card text-center border-start border-warning border-5">
            <h6 className="text-muted">Pendientes</h6>
            <h3>{orders.filter((o) => o.status === "Pendiente").length}</h3>
          </div>
        </Col>
        <Col md={4}>
          <div className="dashboard-card text-center border-start border-success border-5">
            <h6 className="text-muted">Productos en Neon</h6>
            <h3>{products.length}</h3>
          </div>
        </Col>
      </Row>
      <div className="d-flex justify-content-end align-items-center mb-4">
        <Button
          variant="success"
          onClick={() => setShowProdModal(true)}
          style={{ marginLeft: "10px" }}
        >
          + Agregar Producto
        </Button>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {editingOrder?.customer ? "Editar Pedido" : "Nuevo Pedido"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Cliente</Form.Label>
              <Form.Control
                type="text"
                value={editingOrder?.customer || ""}
                onChange={(e) =>
                  setEditingOrder({ ...editingOrder, customer: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Total</Form.Label>
              <Form.Control
                type="number"
                value={editingOrder?.total || ""}
                onChange={(e) =>
                  setEditingOrder({ ...editingOrder, total: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Estado</Form.Label>
              <Form.Select
                value={editingOrder?.status || "Pendiente"}
                onChange={(e) =>
                  setEditingOrder({ ...editingOrder, status: e.target.value })
                }
              >
                <option value="Pendiente">Pendiente</option>
                <option value="Enviado">Enviado</option>
                <option value="Cancelado">Cancelado</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={saveOrder}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showProdModal} onHide={() => setShowProdModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Gestión de Producto</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>URL de la Imagen</Form.Label>
              <Form.Control
                placeholder="https://images..."
                value={newProd.image_url}
                onChange={(e) =>
                  setNewProd({ ...newProd, image_url: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Nombre del Producto</Form.Label>
              <Form.Control
                value={newProd.title}
                onChange={(e) =>
                  setNewProd({ ...newProd, title: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                as="textarea"
                value={newProd.description}
                onChange={(e) =>
                  setNewProd({ ...newProd, description: e.target.value })
                }
              />
            </Form.Group>
            <div className="d-flex gap-2">
              <Form.Group className="mb-3 w-50">
                <Form.Label>Precio ($)</Form.Label>
                <Form.Control
                  type="number"
                  value={newProd.price}
                  onChange={(e) =>
                    setNewProd({ ...newProd, price: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3 w-50">
                <Form.Label>Categoría</Form.Label>
                <Form.Select
                  value={newProd.category}
                  onChange={(e) =>
                    setNewProd({ ...newProd, category: e.target.value })
                  }
                >
                  <option value="Panadería">Panadería</option>
                  <option value="Pastas">Pastas</option>
                  <option value="Snacks">Snacks</option>
                </Form.Select>
              </Form.Group>
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={saveProduct}>
            Guardar Producto
          </Button>
        </Modal.Footer>
      </Modal>
      <h2 className="mt-5" style={{ color: "#6c5b4b" }}>
        🍞 Gestión de Productos
      </h2>
      <div className="dashboard-card">
        <Table
          responsive
          hover
          className="align-middle border-0 table-orders-style"
        >
          <thead className="bg-dark text-white">
            <tr>
              <th className="ps-4">Imagen</th>
              <th>Producto</th>
              <th>Categoría</th>
              <th className="text-center">Precio</th>
              <th className="text-center pe-4">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map((prod) => (
              <tr key={prod.product_id || prod.id}>
                <td className="ps-4">
                  <img
                    src={prod.image_url}
                    alt={prod.title}
                    className="rounded-3 shadow-sm"
                    style={{
                      width: "50px",
                      height: "40px",
                      objectFit: "cover",
                    }}
                  />
                </td>
                <td>
                  <div className="fw-bold text-dark">{prod.title}</div>
                </td>
                <td>{prod.category || "Sin categoría"}</td>
                <td className="text-center fw-medium">
                  ${prod.price.toLocaleString()}
                </td>
                <td className="text-center pe-4">
                  <Button
                    variant="light"
                    className="btn-action edit-btn me-2"
                    onClick={() => handleEditProduct(prod)}
                  >
                    ✏️
                  </Button>
                  <Button
                    variant="light"
                    className="btn-action delete-btn"
                    onClick={() => deleteProduct(prod.product_id || prod.id)}
                  >
                    🗑️
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <hr className="my-5" />
    </Container>
  );
};

export default AdminDashboard;
