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
import { getInitials } from "../utils/helpers";

const Navbar = () => {
  const { cart, setCart } = useContext(CartContext);
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const { token, logout, user } = useContext(UserContext);

  const navigate = useNavigate();

  const { searchTerm, setSearchTerm } = useContext(ProductContext);
  const [isNavExpanded, setIsNavExpanded] = useState(false);

  const handleLogout = () => {
    logout(); // Limpia el estado global
    setCart([]);
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

  console.log("Datos del usuario en Navbar:", user);
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

          <Form
            className="d-flex me-lg-3 my-3 my-lg-0"
            onSubmit={handleSearchSubmit}
          >
            <Form.Control
              type="search"
              placeholder="Buscar pan, pasteles..."
              className="me-2 rounded-pill"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Form>

          <div className="d-flex align-items-center justify-content-between justify-content-lg-end gap-3 pb-3 pb-lg-0">
            {token ? (
              <div className="d-flex align-items-center gap-2 gap-md-3 flex-wrap justify-content-between">
                {/* Favoritos: Icono en móvil, Texto en Desktop */}
                <NavLink
                  to="/favoritos"
                  className="nav-icon-link text-decoration-none d-flex align-items-center gap-1"
                  onClick={() => setIsNavExpanded(false)}
                >
                  <FaHeart className="d-xl-none text-danger" size={24} />
                  <span className="d-none d-xl-inline small fw-bold p-1">
                    Favoritos
                  </span>
                </NavLink>

                {/* Mis Pedidos: Icono en móvil, Texto en Desktop */}
                <NavLink
                  to="/mis-pedidos"
                  className="nav-icon-link text-decoration-none d-flex align-items-center gap-1"
                  onClick={() => setIsNavExpanded(false)}
                >
                  <FaClipboardList className="d-xl-none text-dark" size={24} />
                  <span className="d-none d-xl-inline small fw-bold">
                    Mis pedidos
                  </span>
                </NavLink>

                {/* Perfil / Avatar */}
                <NavLink
                  to="/perfil"
                  className="nav-link d-flex align-items-center gap-2 py-0"
                  onClick={() => setIsNavExpanded(false)}
                >
                  {/* Imagen o Iniciales */}
                  {user?.img_url_customer &&
                  !user.img_url_customer.includes("placeholder") ? (
                    <img
                      src={user.img_url_customer}
                      alt="Profile"
                      className="rounded-circle border shadow-sm"
                      style={{
                        width: "35px",
                        height: "35px",
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    <div
                      className="icon-logo-nav rounded-circle d-flex align-items-center justify-content-center fw-bold text-white shadow-sm"
                      style={{
                        width: "35px",
                        height: "35px",
                        minWidth: "35px",
                      }}
                    >
                      {getInitials(user?.name)}
                    </div>
                  )}
                  <div className="text-start" style={{ lineHeight: "1" }}>
                    <span
                      className="d-block text-muted"
                      style={{ fontSize: "0.65rem" }}
                    >
                      Bienvenido
                    </span>
                    <span className="fw-bold" style={{ fontSize: "0.85rem" }}>
                      {user?.customer_name || user?.nombre
                        ? (user.customer_name || user.nombre).split(" ")[0]
                        : "Usuario"}
                    </span>
                  </div>
                </NavLink>

                {/* Botón Salir */}
                <button
                  onClick={handleLogout}
                  className="btn btn-outline-danger btn-sm rounded-pill px-3"
                  style={{ fontSize: "0.75rem" }}
                >
                  Salir
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

            {/* Carrito: Siempre al final */}
            <Link
              to="/carrito"
              className="nav-icon-link position-relative ms-2"
              onClick={() => setIsNavExpanded(false)}
            >
              <FaShoppingCart size={24} />
              {totalItems > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill cart-badge-custom">
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
