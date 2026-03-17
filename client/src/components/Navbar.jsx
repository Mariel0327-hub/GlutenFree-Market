import { NavLink, Link } from "react-router-dom";
import { FaShoppingCart, FaUserCircle } from "react-icons/fa";
import "../assets/css/Navbar.css";
import logo from "../assets/imgs/GlutenFree_logopng.png";
import { useContext } from "react";
import { ProductContext } from "../context/ProductContext";
import { Form } from "react-bootstrap";

const Navbar = () => {
  const totalItems = 0;
  const token = false;

  const { searchTerm, setSearchTerm } = useContext(ProductContext);
 
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm py-3 sticky-top">
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img src={logo} alt="GlutenFree Market" style={{ height: "45px" }} />
        </Link>

        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link px-3" href="#nosotros">
                Nosotros
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link px-3" href="#contacto">
                Contacto
              </a>
            </li>
            <li className="nav-item">
              <Link className="nav-link px-3" to="/productos">
                Productos
              </Link>
            </li>
          </ul>

          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Buscar pan, pasteles..."
              className="me-2"
              value={searchTerm} // <--- Sincronizado con el contexto
              onChange={(e) => setSearchTerm(e.target.value)} //dispara el filtro en ProductosView
            />
          </Form>

          <div className="d-flex align-items-center gap-3">
            {token ? (
              <NavLink
                to="/perfil"
                className="nav-icon-link text-decoration-none gap-2"
              >
                <FaUserCircle size={24} />
                <span className="d-none d-xl-inline small fw-bold">
                  Mi Perfil
                </span>
              </NavLink>
            ) : (
              <div className="d-flex gap-2">
                <Link to="/login" className="btn  btn-sm px-3 rounded-pill">
                  Login
                </Link>
                <Link to="/registro" className="btn  btn-sm px-3 rounded-pill">
                  Registro
                </Link>
              </div>
            )}

            <Link
              to="/carrito"
              className="nav-icon-link position-relative ms-2"
            >
              <FaShoppingCart size={22} />
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
