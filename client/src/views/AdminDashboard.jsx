import { useState, useEffect, useContext } from "react";
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
//import { productsData } from "../data/products";
import axios from "axios";
import { UserContext } from "../context/UserContext";

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [show, setShow] = useState(false);
  const [editingOrder, setEditingOrder] = useState({
    id_customer: "",
    total: 0,
    status: "Pendiente",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [showProdModal, setShowProdModal] = useState(false);
  const { token, user } = useContext(UserContext);

  const [newProd, setNewProd] = useState({
    product_id: "",
    title: "",
    price: 0,
    image_url: "",
    product_description: "",
    category: "Sin categoría",
    stock: 0,
    sku: 0,
    is_active: true,
  });
  const filteredOrders = orders.filter((o) =>
    (o.id_customer || "").toLowerCase().includes(searchTerm.toLowerCase()),
  );
  const cargarDatosDesdeBD = async () => {
    if (!token) return;
    const config = { headers: { Authorization: `Bearer ${token}` } };

    try {
      const res = await axios.get(
        `http://localhost:3000/api/products`,
        config,
      );
      console.log(products)
      console.log("Esto es : " , res)
      console.log("DATOS FRESCOS:", res.data);
      setProducts([...res.data]);
    } catch (e) {
      console.error("Error productos:", e);
    }

    try {
      const res = await axios.get("http://localhost:3000/api/order", config);
      //console.log("El cliente es:", res.data[1].id_customer);
      // console.table(res.data, ["order_total_id", "id_customer", "total"]);
      setOrders(res.data);
    } catch (e) {
      console.error("Error órdenes:", e);
    }
  };

  useEffect(() => {
    if (token) {
      cargarDatosDesdeBD();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const saveProduct = async () => {
    console.log("ID que se enviará:", newProd.product_id);
    console.log("Payload que se enviará:", {
      title: newProd.title,
      stock: Number(newProd.stock),
      sku: newProd.sku, // Prueba quitando el Number() si el SKU tiene letras
    });
    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const url = "http://localhost:3000/api/products";

      const payload = {
        title: newProd.title,
        product_description: newProd.product_description,
        price: Number(newProd.price),
        image_url: newProd.image_url,
        stock: Number(newProd.stock),
        category: newProd.category,
        sku: Number(newProd.sku),
        is_active: newProd.is_active,
      };

      if (newProd.product_id) {
        const res = await axios.put(
          `${url}/${newProd.product_id}`,
          payload,
          config,
        );
        console.log("Respuesta del servidor:", res.data);
      } else {
        await axios.post(url, payload, config);
      }
      setTimeout(async () => {
        await cargarDatosDesdeBD();
      }, 300);

      await cargarDatosDesdeBD();
      setShowProdModal(false);

      setNewProd({
        product_id: "",
        title: "",
        product_description: "",
        price: 0,
        image_url: "",
        stock: 0,
        category: "Sin categoría",
        sku: 0,
        is_active: true,
      });

      Swal.fire("Éxito", "Producto sincronizado con Neon", "success");
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "No se pudo guardar en la base de datos", "error");
    }
  };

  const deleteProduct = async (id) => {
    const result = await Swal.fire({
      title: "¿Eliminar permanentemente?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, borrar de Neon",
    });

    if (result.isConfirmed) {
      try {
        const config = { headers: { Authorization: `Bearer ${token}` } };
        await axios.delete(`http://localhost:3000/api/products/${id}`, config);
        cargarDatosDesdeBD();
        Swal.fire(
          "Eliminado",
          "El producto ya no existe en la base de datos",
          "success",
        );
      } catch (error) {
        Swal.fire("Error", "No se pudo eliminar el registro", error);
      }
    }
  };

  const handleClose = () => {
    setShow(false);
    setEditingOrder(null);
  };
  const handleShow = (order) => {
    setEditingOrder({
      ...order,
      status: order.is_paid ? "Pagado" : "Pendiente",
    });
    setShow(true);
  };

  const deleteOrder = async (id) => {
    const confirm = await Swal.fire({
      title: "¿Eliminar pedido?",
      text: `Se borrará el registro #${id} de Neon`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
    });

    if (confirm.isConfirmed) {
      try {
        const config = { headers: { Authorization: `Bearer ${token}` } };

        await axios.delete(`http://localhost:3000/api/order/${id}`, config);
        Swal.fire("Eliminado", "El pedido ha sido borrado", "success");
        cargarDatosDesdeBD();
      } catch (error) {
        Swal.fire("Error", "No se pudo eliminar de la base de datos", error);
      }
    }
  };
  const saveOrder = async () => {
    if (!editingOrder?.id_customer) {
      return Swal.fire("Error", "El ID del Cliente es obligatorio", "error");
    }

    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const url = "http://localhost:3000/api/order";

      const payload = {
        total: editingOrder.total,
        is_paid: editingOrder.is_paid,
        is_shipped: editingOrder.is_shipped || false,
        id_customer: editingOrder.id_customer,
        created_at: editingOrder.created_at,
      };

      if (editingOrder.order_total_id) {
        await axios.put(
          `${url}/${editingOrder.order_total_id}`,
          payload,
          config,
        );
        Swal.fire("Actualizado", "Pedido sincronizado con Neon", "success");
      } else {
        await axios.post(url, payload, config);
        Swal.fire("Creado", "Nuevo pedido guardado", "success");
      }

      handleClose();
      await cargarDatosDesdeBD();
    } catch (error) {
      console.error("Error al guardar:", error.response?.data);
      Swal.fire("Error", "No se pudo actualizar la base de datos", "error");
    }
  };
  const handleEditProduct = (prod) => {
    setNewProd({
      product_id: prod.product_id,
      title: prod.title,
      price: prod.price,
      image_url: prod.image_url,
      product_description: prod.product_description,
      category: prod.category,
      stock: prod.stock,
      sku: prod.sku,
      is_active: prod.is_active,
    });
    setShowProdModal(true);
  };
  return (
    <Container className="py-5">
      <Card className="shadow-sm border-0">
        <Card.Body>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 style={{ color: "#6c5b4b" }}>📦 Panel de Pedidos</h2>
            <Button variant="primary" onClick={() => handleShow()}>
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
                <tr key={order.order_total_id}>
                  <td>#{order.order_total_id}</td>
                  <td>{order.id_customer}</td>

                  <td>
                    {order.order_date
                      ? new Date(order.order_date).toLocaleDateString()
                      : "S/F"}
                  </td>

                  <td>${Number(order.total).toLocaleString("es-CL")}</td>

                  <td>
                    <Badge
                      pill
                      bg={order.status === "Enviado" ? "success" : "warning"}
                      className="px-3 py-2"
                      style={{ fontSize: "0.85rem", fontWeight: "500" }}
                    >
                      {order.status === "Enviado" ? "● Enviado" : "○ Pendiente"}
                    </Badge>
                  </td>
                  <td>
                    <Button
                      className="btn-action"
                      onClick={() => handleShow(order)}
                    >
                      ✏️
                    </Button>
                    <Button
                      className="btn-action"
                      onClick={() => deleteOrder(order.order_total_id)}
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
              <Form.Label>ID Cliente</Form.Label>
              <Form.Control
                type="text"
                /* Cambia editingOrder.customer por editingOrder.id_customer */
                value={editingOrder?.id_customer || ""}
                onChange={(e) =>
                  setEditingOrder({
                    ...editingOrder,
                    id_customer: e.target.value,
                  })
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

      <Modal
        show={showProdModal}
        onHide={() => setShowProdModal(false)}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {newProd.product_id ? "Editar Producto" : "Nuevo Producto"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {/* Título y Precio */}
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formTitle">
                <Form.Label>Nombre del Producto</Form.Label>
                <Form.Control
                  type="text"
                  value={newProd.title}
                  onChange={(e) =>
                    setNewProd({ ...newProd, title: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formPrice">
                <Form.Label>Precio</Form.Label>
                <Form.Control
                  type="number"
                  value={newProd.price}
                  onChange={(e) =>
                    setNewProd({ ...newProd, price: Number(e.target.value) })
                  }
                />
              </Form.Group>
            </Row>

            {/* Descripción (product_description) */}
            <Form.Group className="mb-3" controlId="formDescription">
              <Form.Label>Descripción Detallada</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={newProd.product_description}
                onChange={(e) =>
                  setNewProd({
                    ...newProd,
                    product_description: e.target.value,
                  })
                }
              />
            </Form.Group>

            {/* Stock y SKU */}
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formStock">
                <Form.Label>Stock (Unidades)</Form.Label>
                <Form.Control
                  type="number"
                  value={newProd.stock}
                  onChange={(e) =>
                    setNewProd({ ...newProd, stock: Number(e.target.value) })
                  }
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formSku">
                <Form.Label>SKU / Código</Form.Label>
                <Form.Control
                  type="number"
                  value={newProd.sku}
                  onChange={(e) =>
                    setNewProd({ ...newProd, sku: Number(e.target.value) })
                  }
                />
              </Form.Group>
            </Row>

            {/* Estado Activo */}
            <Form.Group className="mb-3" controlId="formActive">
              <Form.Check
                type="switch"
                label="¿Producto disponible para la venta?"
                checked={newProd.is_active}
                onChange={(e) =>
                  setNewProd({ ...newProd, is_active: e.target.checked })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowProdModal(false)}>
            Cancelar
          </Button>
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
              <th className="ps-4">ID</th>
              <th className="ps-4">Imagen</th>
              <th>Producto</th>
              <th>SKU</th>
              <th>Stock</th>
              <th>Categoría</th>
              <th className="text-center">Precio</th>
              <th className="text-center pe-4">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map((prod) => (
              <tr key={prod.product_id}>
                <td>{prod.product_id}</td>
                <td className="ps-4">
                  <img
                    src={
                      prod.image_url ||
                      "https://via.placeholder.com/150?text=Sin+Foto"
                    }
                    alt={prod.title}
                    style={{
                      width: "50px",
                      height: "40px",
                      objectFit: "cover",
                    }}
                    className="rounded-3 shadow-sm"
                  />
                </td>
                <td>
                  <div className="fw-bold text-dark">{prod.title}</div>
                  <div className="text-muted" style={{ fontSize: "0.75rem" }}>
                    {new Date(prod.updated_at).toLocaleString("es-CL")}
                  </div>
                  <small
                    className="text-muted d-block text-truncate"
                    style={{ maxWidth: "150px" }}
                  >
                    {prod.product_description}
                  </small>
                </td>
                <td>
                  <code className="text-primary">{prod.sku || "N/A"}</code>
                </td>
                <td>
                  <span
                    className={`fw-bold ${prod.stock < 5 ? "text-danger" : "text-success"}`}
                  >
                    {prod.stock} un.
                  </span>
                  <div style={{ fontSize: "10px", color: "#ccc" }}>
                    Ref: {new Date().getSeconds()}
                  </div>
                </td>
                <td>
                  <span className="badge bg-light text-dark border">
                    {prod.category}
                  </span>
                </td>
                <td className="text-center fw-medium">
                  ${Number(prod.price).toLocaleString("es-CL")}
                </td>
                <td
                  className="text-center pe-4"
                  style={{ whiteSpace: "nowrap" }}
                >
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
                    onClick={() => deleteProduct(prod.product_id)}
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
