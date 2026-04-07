import { useState, useContext } from "react";
import { ReviewContext } from "../context/ReviewContext"; // Asegúrate de importar el contexto
import ReviewSummary from "./ReviewSummary";
import ReviewAdminTable from "./ReviewAdminTable";
import AdminStats from "./AdminStats";
import AdminProducts from "./AdminProducts";

const AdminPanel = () => {
  const [view, setView] = useState("reviews");
  const { reviews } = useContext(ReviewContext); // Traemos las reseñas del context

  return (
    <div className="container-fluid">
      <div className="row">
        {/* SIDEBAR: Solo botones, sin componentes pesados dentro */}
        <nav className="col-md-3 col-lg-2 bg-light sidebar shadow-sm min-vh-100">
          <div className="position-sticky pt-3">
            <h5 className="px-3 mb-4 text-muted">Menú Admin</h5>
            <ul className="nav flex-column">
              <li className="nav-item mb-2">
                <button
                  className={`nav-link btn w-100 text-start ${view === "reviews" ? "active bg-primary text-white" : "text-dark"}`}
                  onClick={() => setView("reviews")}
                >
                  📊 Reseñas
                </button>
              </li>
              <li className="nav-item mb-2">
                <button
                  className={`nav-link btn w-100 text-start ${view === "products" ? "active bg-primary text-white" : "text-dark"}`}
                  onClick={() => setView("products")}
                >
                  🍞 Productos
                </button>
              </li>
            </ul>
          </div>
        </nav>

        {/* CONTENIDO PRINCIPAL: Aquí es donde "viven" los componentes */}
        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 py-4">
          {view === "reviews" && (
            <>
              {/* Le pasamos reviews o un array vacío para que no explote el .length */}
              <ReviewSummary reviews={reviews || []} />
              <div className="mt-4">
                <ReviewAdminTable />
              </div>
            </>
          )}

          {view === "products" && <AdminProducts />}
        </main>
      </div>
    </div>
  );
};

export default AdminPanel;
