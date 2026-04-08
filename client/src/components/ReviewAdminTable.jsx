import { useContext } from "react";
import { ReviewContext } from "../context/ReviewContext";
import { FaTrashAlt } from "react-icons/fa";

export default function ReviewAdminTable() {
  const { reviews, deleteReview } = useContext(ReviewContext);

  const handleDelete = async (id) => {
    const confirm = window.confirm(
      "¿Estás seguro de eliminar esta reseña permanentemente?",
    );
    if (confirm) {
      const result = await deleteReview(id);
      if (result.success) {
        alert("Reseña eliminada con éxito");
      } else {
        alert("Error al eliminar: " + result.error);
      }
    }
  };

  return (
    <div className="table-responsive bg-white p-3 border rounded shadow-sm">
      <h4 className="mb-3">Gestión de Opiniones</h4>
      <table className="table table-hover align-middle">
        <thead className="table-light">
          <tr>
            <th>Fecha</th>
            <th>Producto</th>
            <th>Comentario</th>
            <th>Rating</th>
            <th className="text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {reviews.map((rev) => (
            <tr key={rev.review_id}>
              <td style={{ fontSize: "0.85rem" }}>
                {new Date(rev.created_at).toLocaleDateString()}
              </td>
              <td className="fw-bold">{rev.id_product || "General"}</td>
              <td style={{ maxWidth: "300px" }} className="text-truncate">
                {rev.review_body}
              </td>
              <td className="text-warning">{"★".repeat(rev.rating)}</td>
              <td className="text-center">
                <button
                  className="btn btn-outline-danger btn-sm"
                  onClick={() => handleDelete(rev.review_id)}
                  title="Eliminar reseña"
                >
                  <FaTrashAlt />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
