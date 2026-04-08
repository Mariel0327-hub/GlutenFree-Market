import { Table, Button } from "react-bootstrap";

const AdminProducts = ({ products, handleEditProduct, deleteProduct, setShowProdModal }) => {
  return (
    <div className="animate__animated animate__fadeIn">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 style={{ color: "#6c5b4b" }}>🍞 Gestión de Productos</h2>
        <Button variant="success" onClick={() => setShowProdModal(true)}>+ Agregar Producto</Button>
      </div>
      <div className="dashboard-card shadow-sm bg-white p-0 rounded overflow-hidden">
        <Table responsive hover className="align-middle mb-0">
          <thead className="bg-dark text-white">
            <tr>
              <th className="ps-4">ID</th>
              <th>Imagen</th>
              <th>Producto</th>
              <th>Stock</th>
              <th className="text-center">Precio</th>
              <th className="text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map((prod) => (
              <tr key={prod.product_id}>
                <td className="ps-4">{prod.product_id}</td>
                <td><img src={prod.image_url} alt={prod.title} style={{ width: "40px", borderRadius: "4px" }} /></td>
                <td>{prod.title}</td>
                <td className={prod.stock < 5 ? "text-danger fw-bold" : ""}>{prod.stock} un.</td>
                <td className="text-center">${Number(prod.price).toLocaleString("es-CL")}</td>
                <td className="text-center">
                  <Button variant="light" className="btn-action" onClick={() => handleEditProduct(prod)}>✏️</Button>
                  <Button variant="light" className="btn-action" onClick={() => deleteProduct(prod.product_id)}>🗑️</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default AdminProducts;