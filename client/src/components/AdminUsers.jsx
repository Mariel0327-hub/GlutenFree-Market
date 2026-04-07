import { Table, Button, Badge, Form, InputGroup } from "react-bootstrap";

const AdminUsers = ({ users, setSearchUser, deleteUser }) => {
  return (
    <div className="bg-white p-4 shadow-sm rounded animate__animated animate__fadeIn">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="fw-bold text-secondary">👥 Gestión de Clientes</h3>
      </div>

      <InputGroup className="mb-4">
        <InputGroup.Text className="bg-white">🔍</InputGroup.Text>
        <Form.Control
          placeholder="Buscar por nombre, email o ID..."
          onChange={(e) => setSearchUser(e.target.value)}
        />
      </InputGroup>

      <div className="table-responsive">
        <Table hover className="align-middle">
          <thead className="table-light">
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Contacto</th>
              <th>Dirección de Envío</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.customer_id}>
                <td>
                  <small className="text-muted text-uppercase">
                    {u.customer_id}
                  </small>
                </td>
                <td className="fw-bold">{u.customer_name}</td>
                <td>
                  <div>{u.email}</div>
                  <small className="text-muted">
                    {u.phone || "Sin teléfono"}
                  </small>
                </td>
                <td>
                  <small>{u.shipping_address}</small>
                </td>
                <td>
                  <div className="d-flex gap-2">
                    <Button
                      variant="outline-danger"
                      size="sm"
                      className="border-0"
                     onClick={() => deleteUser(u.customer_id)}
                    >
                      🗑️
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        {users.length === 0 && (
          <div className="text-center py-5 text-muted">
            No se encontraron clientes registrados.
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminUsers;
