import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "./index.css";
import App from "./App.jsx";
import { UserProvider } from "./context/UserContext.jsx";
import ProductProvider from "./context/ProductContext.jsx";
import { ReviewProvider } from "./context/ReviewContext.jsx";
import { OrderProvider } from "./context/OrderContext.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserProvider>
      <ProductProvider>
        <CartProvider>
          <ReviewProvider>
            <OrderProvider>
              <BrowserRouter>
                <App />
              </BrowserRouter>
            </OrderProvider>
          </ReviewProvider>
        </CartProvider>{" "}
      </ProductProvider>
    </UserProvider>
  </StrictMode>,
);
