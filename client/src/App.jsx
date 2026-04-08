import { Navigate, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./views/Home";
import Login from "./views/Login";
import Register from "./views/Register";
//import Profile from "./views/Profile";
import ProductDetail from "./components/ProductDetail";
import ProductosView from "./components/ProductosView";
import Cart from "./views/Cart";
import NotFound from "./views/NotFound";
import MainLayout from "./components/MainLayout";
import Checkout from "./components/Checkout";
import SuccessOrder from "./components/SuccessOrder";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./views/Profile";
import Favorites from "./views/Favorites";
import MyOrders from "./components/MyOrders";
import MyReviews from "./views/MyReviews";
import AllTestimonials from "./views/AllTestimonials";
import ScrollToTop from "./components/ScrollToTop";
//import Testimonials from "./components/Testimonials";
import AdminDashboard from "./views/AdminDashboard";
import AdminLogin from "./views/AdminLogin";
import { useContext } from "react";
import { UserContext } from "./context/UserContext";

function App() {
  const { token, user } = useContext(UserContext);

  return (
    <>
      <ScrollToTop />
      <Navbar />

      <Routes>
        {/* Rutas publicas */}
        <Route path="/" element={<Home />} />
        <Route path="/producto/:id" element={<ProductDetail />} />
        <Route path="/productos" element={<ProductosView />} />
        <Route path="/productos/:categoria" element={<ProductosView />} />{" "}
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Register />} />
        <Route path="/carrito" element={<Cart />} />
        <Route path="/todos-los-testimonios" element={<AllTestimonials />} />
        <Route path="/admin" element={<AdminLogin />} />
        {/* Rutas privadas */}
        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          }
        />
        <Route
          path="/success"
          element={
            <ProtectedRoute>
              <SuccessOrder />
            </ProtectedRoute>
          }
        />
        <Route
          path="/perfil"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/favoritos"
          element={
            <ProtectedRoute>
              <Favorites />
            </ProtectedRoute>
          }
        />
        <Route
          path="/mis-pedidos"
          element={
            <ProtectedRoute>
              <MyOrders />
            </ProtectedRoute>
          }
        />
        <Route
          path="/mis-reviews"
          element={
            <ProtectedRoute>
              <MyReviews />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-panel"
          element={
            token && user?.role === "admin" ? (
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            ) : (
              <Navigate to="/admin" />
            )
          }
        />
        {/* Ruta 404 por si se pierden */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <MainLayout />
      <Footer />
    </>
  );
}

export default App;
