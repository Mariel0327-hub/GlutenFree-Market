import { NavLink, Link } from "react-router-dom";
import {
  FaShoppingCart,
  FaUserCircle,
  FaHeart,
  FaClipboardList,
} from "react-icons/fa";
import "../assets/css/Navbar.css";
import logo from "../assets/imgs/GlutenFree_logopng.png";
import { useContext, useState } from "react";
import { ProductContext } from "../context/ProductContext";
import { Form } from "react-bootstrap";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";

const Navbar = () => {
  const { cart } = useContext(CartContext);
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const { token, logout, user } = useContext(UserContext);

  const navigate = useNavigate();

  const { searchTerm, setSearchTerm } = useContext(ProductContext);
  const [isNavExpanded, setIsNavExpanded] = useState(false);

  const handleLogout = () => {
    logout(); // Limpia el estado global
    navigate("/"); // Lo mandas al inicio (o "/login")
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/productos?search=${searchTerm.trim()}`);
      setSearchTerm("");
      setIsNavExpanded(false);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm py-3 sticky-top">
      <div className="container">
        <Link
          className="navbar-brand d-flex align-items-center"
          to="/"
          onClick={() => setIsNavExpanded(false)}
        >
          <img src={logo} alt="GlutenFree Market" style={{ height: "45px" }} />
        </Link>

        <button
          className="navbar-toggler border-0"
          type="button"
          onClick={() => setIsNavExpanded(!isNavExpanded)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className={`collapse navbar-collapse ${isNavExpanded ? "show" : ""}`}
          id="navbarNav"
        >
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a
                className="nav-link px-3"
                href="#nosotros"
                onClick={() => setIsNavExpanded(false)}
              >
                Nosotros
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link px-3"
                href="#contacto"
                onClick={() => setIsNavExpanded(false)}
              >
                Contacto
              </a>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link px-3"
                to="/productos"
                onClick={() => setIsNavExpanded(false)}
              >
                Productos
              </Link>
            </li>
          </ul>

          <Form className="d-flex" onSubmit={handleSearchSubmit}>
            <Form.Control
              type="search"
              placeholder="Buscar pan, pasteles..."
              className="me-2 rounded-pill"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Form>

          <div className="d-flex align-items-center gap-3">
            {token ? (
              <div className="d-flex align-items-center gap-3">
                {/* Favoritos */}
                <NavLink
                  to="/favoritos"
                  className="nav-icon-link text-decoration-none"
                >
                  <FaHeart
                    size={22}
                    title="Mis Favoritos"
                    onClick={() => setIsNavExpanded(false)}
                  />
                  <span className="d-none d-xl-inline small fw-bold p-1">
                    Favoritos
                  </span>
                </NavLink>

                {/* Mis Pedidos */}
                <NavLink
                  to="/mis-pedidos"
                  className="nav-icon-link text-decoration-none"
                >
                  <FaClipboardList
                    size={22}
                    title="Mis Pedidos"
                    onClick={() => setIsNavExpanded(false)}
                  />
                  <span className="d-none d-xl-inline small fw-bold">
                    Mis pedidos
                  </span>
                </NavLink>

                {/* Perfil */}
                <NavLink
                  to="/perfil"
                  className="nav-icon-link text-decoration-none d-flex align-items-center gap-1"
                >
                  {user?.avatar_url ? (
                    <img
                      src={user.avatar_url}
                      className="rounded-circle"
                      style={{
                        width: "30px",
                        height: "30px",
                        objectFit: "cover",
                      }}
                      alt="User"
                    />
                  ) : (
                    <FaUserCircle size={24} />
                  )}
                  <span className="d-none d-xl-inline small fw-bold">
                    {user ? `Hola, ${user.name.split(" ")[0]}` : "Mi Perfil"}
                  </span>
                </NavLink>

                {/* Botón Salir */}
                <button
                  onClick={handleLogout}
                  className="btn btn-outline-danger btn-sm rounded-pill px-3 ms-2"
                  style={{ fontSize: "0.75rem" }}
                >
                  Cerrar Sesión
                </button>
              </div>
            ) : (
              <div className="d-flex gap-2">
                <Link
                  to="/login"
                  className="btn btn-outline-dark btn-sm px-3 rounded-pill"
                  onClick={() => setIsNavExpanded(false)}
                >
                  Login
                </Link>
                <Link
                  to="/registro"
                  className="btn btn-dark btn-sm px-3 rounded-pill"
                  style={{ backgroundColor: "#3e2723" }}
                  onClick={() => setIsNavExpanded(false)}
                >
                  Registro
                </Link>
              </div>
            )}

            <Link
              to="/carrito"
              className="nav-icon-link position-relative ms-2"
            >
              <FaShoppingCart size={24} />
              {totalItems > 0 && (
                <span
                  key={totalItems}
                  className="position-absolute top-0 start-100 translate-middle badge rounded-pill cart-badge-custom"
                >
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
