import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Home } from "./pages/HomePage.tsx";
import { Toaster } from "react-hot-toast";
import { Register } from "./pages/Register.tsx";
import { Login } from "./pages/LoginPage.tsx";
import { ProductsPage } from "./pages/ProductList.tsx";

import { Header } from "./components/Header.tsx";
import { Footer } from "./components/Footer.tsx";
import { ProductDetail } from "./pages/ProductDetails.tsx";
import { CartProvider } from "./contexts/CartContext.tsx";
import { CartPage } from "./pages/CartPage.tsx";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import Checkout from "./components/Checkout.tsx";
function App() {
  return (
    <PayPalScriptProvider
      options={{
        clientId: import.meta.env.VITE_PAYPAL_CLIENT_ID,
      }}
    >
      <Router>
        <CartProvider>
          <Toaster position="top-right" />
          <Header />

          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/products/:code" element={<ProductDetail />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<Checkout />} />
          </Routes>
          <Footer />
        </CartProvider>
      </Router>
    </PayPalScriptProvider>
  );
}

export default App;
