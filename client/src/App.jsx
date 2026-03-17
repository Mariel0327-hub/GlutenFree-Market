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
import ProductProvider from "./context/ProductContext";
import MainLayout from "./components/MainLayout";

function App() {
  return (
    <ProductProvider>
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/producto/:id" element={<ProductDetail />} />
          <Route path="/productos" element={<ProductosView />} />
          <Route
            path="/productos/:categoria"
            element={<ProductosView />}
          />{" "}
          
          {/* Para cuando agreguemos los filtros */}
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Register />} />
          <Route path="/carrito" element={<Cart />} />

          
          {/* Ruta 404 por si se pierden */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <MainLayout />
        <Footer />
      </BrowserRouter>
    </ProductProvider>
  );
}

export default App;
