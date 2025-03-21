import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import ProductPage from "../pages/ProductPage";
import CadastroPage from "../pages/CadastroPage";
import CheckoutPage from "../pages/CheckoutPage";
import CartPage from "../pages/CartPage"; 
import SuccessPage from "../pages/CheckoutSuccessPage";
import { CartProvider } from "../context/CartProvider";

const AppRouter = () => {
  return (
    <Router>
      <CartProvider>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/cadastro" element={<CadastroPage />} />
          <Route path="/products" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/checkout/success" element={<SuccessPage />} />
        </Routes>
      </CartProvider>
    </Router>
  );
};

export default AppRouter;
