import { Table, Card, Button, Badge, InputGroup, Form } from "react-bootstrap";
import { useState, useEffect, useContext } from "react";
import { baseURL } from "../utils/baseUrl.js";
import { UserContext } from "../context/UserContext";

const AdminOrders = ({
  filteredOrders,
  setSearchTerm,
  handleShow,
  deleteOrder,
}) => {
  const [datosCompletos, setDatosCompletos] = useState([]);
  const { token } = useContext(UserContext);
  useEffect(() => {
    const obtenerTodo = async () => {
      try {
        if (!token) return;

        const headers = {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        };

        // 1. Pedimos la lista de carritos
        const response = await fetch(`${baseURL}/api/cart`, {
          method: "GET",
          headers,
        });
        if (!response.ok) return;
        const todosLosCarts = await response.json();

        // 2. Buscamos los detalles de cada uno (donde está el chocolate y el pan)
        const detallesPromesas = todosLosCarts.map(async (cart) => {
          const resDetalle = await fetch(
            `${baseURL}/api/cart/${cart.cart_id}`,
            { headers },
          );
          if (!resDetalle.ok) return { ...cart, items: [] };

          const detalle = await resDetalle.json();

          const itemsArray = Array.isArray(detalle) ? detalle : [detalle];

          return { ...cart, items: itemsArray };
        });

        const final = await Promise.all(detallesPromesas);


        setDatosCompletos(final);
      } catch (error) {
        console.error("Error en la carga de datos:", error);
      }
    };

    obtenerTodo();
  }, [baseURL, token]); // <--- No olvides el token aquí
  return (
    <Card className="shadow-sm border-0 animate__animated animate__fadeIn">
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
          <thead className="bg-light text-muted small px-3">
            <tr>
              <th>ID ORDEN</th>
              <th>CLIENTE</th>
              <th>FECHA</th>
              <th>TOTAL</th>
              <th>ESTADO</th>
              <th>ACCIONES</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order.order_total_id}>
                <td className="fw-bold">{order.order_total_id}</td>

                <td>
                  <div className="d-flex flex-column">
                    {/* El nombre viene del JOIN con la tabla customer */}
                    <span>{order.customer_name || "Cliente"}</span>
                    <small className="text-muted" style={{ fontSize: "10px" }}>
                      ID: {order.id_customer}
                    </small>
                  </div>
                </td>

                <td>{order.order_date}</td>
                <td className="fw-bold">${order.total?.toLocaleString()}</td>

                <td>
                  <span
                    className={`badge ${order.is_paid ? "bg-success" : "bg-warning text-dark"}`}
                  >
                    {order.is_paid ? "Pagado" : "Pendiente"}
                  </span>
                </td>

                <td>
                  {/* BOTÓN EDITAR: Pasa el objeto 'order' completo para el modal */}
                  <Button
                    variant="light"
                    size="sm"
                    className="me-1 mb-2 border shadow-sm btn-action"
                    onClick={() => handleShow(order)}
                  >
                    ✏️
                  </Button>
                  <Button
                    variant="light"
                    size="sm"
                    className="border shadow-sm text-danger btn-action"
                    onClick={() => deleteOrder(order.order_total_id)}
                  >
                    🗑️
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <h2 className="p-3" style={{ color: "#6c5b4b" }}>Carritos Activos</h2>
        <div className="table-responsive">
          <table className="table table-sm table-hover border">
            <thead className="table-light text-secondary">
              <tr>
                <th>ID Carrito</th>
                <th>ID Usuario</th>
                <th>Última Actualización</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(datosCompletos) && datosCompletos.length > 0 ? (
                datosCompletos.map((cart) => (
                  <tr key={cart.cart_id}>
                    {/* ID del Carrito */}
                    <td className="small text-muted">{cart.cart_id}</td>

                    {/* ID del Cliente */}
                    <td className="fw-bold">{cart.id_customer}</td>

                    {/* Fecha de actualización formateada */}
                    <td>
                      {new Date(cart.updated_at).toLocaleDateString()}{" "}
                      {new Date(cart.updated_at).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center text-muted p-3">
                    No hay carritos activos en este momento.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card.Body>
    </Card>
  );
};

export default AdminOrders;
