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
import { baseURL } from "../utils/baseUrl.js";
import ImageUploader from "../components/ImageUploader.jsx";
import { ReviewContext } from "../context/ReviewContext";
import ReviewSummary from "../components/ReviewSummary";
import ReviewAdminTable from "../components/ReviewAdminTable.jsx";
import AdminStats from "../components/AdminStats.jsx";
import AdminOrders from "../components/AdminOrders.jsx";
import AdminProducts from "../components/AdminProducts.jsx";
import AdminPanel from "../components/PanelAdmin.jsx";
import AdminUsers from "../components/AdminUsers.jsx";

const AdminDashboard = () => {
  const [usersList, setUsersList] = useState([]);
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [show, setShow] = useState(false);
  const { reviews } = useContext(ReviewContext);
  const [editingOrder, setEditingOrder] = useState({
    id_customer: "",
    total: 0,
    status: "Pendiente",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [showProdModal, setShowProdModal] = useState(false);
  const { token } = useContext(UserContext);
  const [activeTab, setActiveTab] = useState("pedidos");
  const [searchUser, setSearchUser] = useState("");

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
      const res = await axios.get(`${baseURL}/api/products`, config);

      setProducts([...res.data]);
    } catch (e) {
      console.error("Error productos:", e);
    }

    try {
      const res = await axios.get(`${baseURL}/api/order`, config);
      setOrders(res.data);
    } catch (e) {
      console.error("Error órdenes:", e);
    }

    try {
      const res = await axios.get(`${baseURL}/api/customer`, config);
      setUsersList(res.data);
    } catch (e) {
      console.error("Error cargando clientes:", e);
    }
  };

  useEffect(() => {
    if (token) {
      cargarDatosDesdeBD();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const saveProduct = async () => {
    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const url = `${baseURL}/api/products`;
      const payload = {
        title: newProd.title,
        product_description: newProd.product_description,
        price: Number(newProd.price),
        image_url: newProd.image_url,
        category_id: newProd.category_id || 1,
        sku: String(newProd.sku),
        is_active: Boolean(newProd.is_active),
      };
      if (!newProd.product_id) {
        payload.stock = Number(newProd.stock);
      }

      if (newProd.product_id) {
        await axios.put(`${url}/${newProd.product_id}`, payload, config);
      } else {
        // CREAR
        await axios.post(url, payload, config);
      }
      await cargarDatosDesdeBD();
      setShowProdModal(false);

      setNewProd({
        product_id: "",
        title: "",
        product_description: "",
        price: 0,
        image_url: "",
        stock: 0,
        category: "",
        sku: "",
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
        await axios.delete(`${baseURL}/api/products/${id}`, config);
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

  const handleClose = () => {
    setShow(false);
    setEditingOrder(null);
  };
  /// Se agregó let status y se definieron casos de pago
  const handleShow = (order) => {
    if (!order) {
      setEditingOrder({ id_customer: "", total: 0, status: "Pendiente" });
      setShow(true);
      return;
    }
    let status;
    if (order.is_shipped) status = "Enviado";
    else if (order.is_paid) status = "Pagado";
    else status = "Pendiente";
    setEditingOrder({
      ...order,
      status,
    });
    setShow(true);
  };
  //////////////////////////////////

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

        await axios.delete(`${baseURL}/api/order/${id}`, config);
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
      const url = `${baseURL}/api/order`;

      const payload = {
        total: Number(editingOrder.total),
        is_paid:
          editingOrder.status === "Pagado" || editingOrder.status === "Enviado",
        is_shipped: editingOrder.status === "Enviado",
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

  const deleteUserLogic = async (customer_id) => {

    if (window.confirm(`¿Eliminar cliente ${customer_id}?`)) {
      try {
        // 1. Petición al Backend
        await axios.delete(`${baseURL}/api/customer/${customer_id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUsersList((prev) =>
          prev.filter((u) => u.customer_id !== customer_id),
        );

        alert("Eliminado con éxito");
      } catch (error) {
        console.error(error);
      }
    }
  };

  const filteredUsers = usersList.filter((u) =>
    (u.customer_name || u.email || "")
      .toLowerCase()
      .includes(searchUser.toLowerCase()),
  );

  return (
    <Container className="py-5">
      <div className="container-fluid">
        <div className="row">
          <nav className="col-md-3 col-lg-2 bg-light min-vh-100 border-end p-3 shadow-sm">
            <h4 className="mb-4 pt-2 text-center" style={{ color: "#6c5b4b" }}>
              Panel Admin
            </h4>
            <div className="nav flex-column nav-pills">
              <button
                className={`nav-link text-start mb-2 ${activeTab === "pedidos" ? "active shadow" : "text-dark border-0"}`}
                onClick={() => setActiveTab("pedidos")}
                style={{ borderRadius: "10px" }}
              >
                📦 Pedidos y Carrito
              </button>
              <button
                className={`nav-link text-start mb-2 ${activeTab === "productos" ? "active shadow" : "text-dark border-0"}`}
                onClick={() => setActiveTab("productos")}
                style={{ borderRadius: "10px" }}
              >
                🍞 Productos
              </button>
              <button
                className={`nav-link text-start mb-2 ${activeTab === "resenas" ? "active shadow" : "text-dark border-0"}`}
                onClick={() => setActiveTab("resenas")}
                style={{ borderRadius: "10px" }}
              >
                ⭐ Reseñas
              </button>
              <button
                className={`nav-link text-start mb-2 ${activeTab === "usuarios" ? "active bg-primary" : "text-dark"}`}
                onClick={() => setActiveTab("usuarios")}
              >
                👥 Usuarios
              </button>
            </div>
          </nav>

          {/* 2. EL CONTENIDO PRINCIPAL */}
          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 py-4 bg-white">
            {activeTab === "pedidos" && (
              <AdminStats orders={orders} products={products} />
            )}

            {/* TAB DE PEDIDOS */}
            {activeTab === "pedidos" && (
              <div className="animate__animated animate__fadeIn">
                <AdminOrders
                  filteredOrders={filteredOrders}
                  setSearchTerm={setSearchTerm}
                  handleShow={handleShow}
                  deleteOrder={deleteOrder}
                />
              </div>
            )}

            {/* TAB DE PRODUCTOS */}
            {activeTab === "productos" && (
              <div className="animate__animated animate__fadeIn">
                <AdminProducts
                  products={products}
                  handleEditProduct={handleEditProduct}
                  deleteProduct={deleteProduct}
                  setShowProdModal={setShowProdModal}
                />
              </div>
            )}

            {/* TAB DE RESEÑAS */}
            {activeTab === "resenas" && (
              <div className="animate__animated animate__fadeIn">
                <ReviewSummary reviews={reviews || []} />
                <ReviewAdminTable />
              </div>
            )}

            {activeTab === "usuarios" && (
              <AdminUsers users={filteredUsers} deleteUser={deleteUserLogic} />
            )}
          </main>
        </div>
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
                  setEditingOrder({
                    ...editingOrder,
                    total: Number(e.target.value),
                  })
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
                <option value="Pagado">Pagado</option>
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
            <Row className="mb-3">
              <ImageUploader
                currentImage={newProd.image_url}
                onUploadSuccess={(url) =>
                  setNewProd({ ...newProd, image_url: url })
                }
              />
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
              {!newProd.product_id && (
                <Form.Group as={Col} controlId="formStock">
                  <Form.Label>Stock Inicial (Unidades)</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Ej: 50"
                    value={newProd.stock}
                    onChange={(e) =>
                      setNewProd({ ...newProd, stock: Number(e.target.value) })
                    }
                  />
                </Form.Group>
              )}

              <Form.Group as={Col} controlId="formSku">
                <Form.Label>SKU / Código</Form.Label>
                <Form.Control
                  type="text" // Cambiado a text por si usas letras en el SKU (ej: "GAL-001")
                  placeholder="Ej: SKU123"
                  value={newProd.sku}
                  onChange={(e) =>
                    setNewProd({ ...newProd, sku: e.target.value })
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
          <Button
            variant="secondary"
            className="me-2 btn-action"
            onClick={() => setShowProdModal(false)}
          >
            Cancelar
          </Button>
          <Button
            variant="primary"
            onClick={saveProduct}
            className="me-2 btn-action"
          >
            Guardar Producto
          </Button>
        </Modal.Footer>
      </Modal>

      <hr className="my-5" />
    </Container>
  );
};

export default AdminDashboard;
