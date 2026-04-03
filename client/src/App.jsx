import { BrowserRouter, Routes, Route } from "react-router-dom";
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
//import MyReviews from "./views/MyReviews";
import AllTestimonials from "./views/AllTestimonials";
import ScrollToTop from "./components/ScrollToTop";
import Testimonials from "./components/Testimonials";

function App() {
  return (
    <BrowserRouter>
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
          path="/mis-testimonios"
          element={
            <ProtectedRoute>
              <Testimonials/>
            </ProtectedRoute>
          }
        />
        {/* Ruta 404 por si se pierden */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <MainLayout />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
