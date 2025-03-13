import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route, Link, useNavigate, Navigate } from "react-router-dom";
import singleSpaReact from "single-spa-react";
import { cartstore } from "../cartstore";

const Header = ({ onLogout }) => (
  <div style={{ display: "flex", justifyContent: "space-between", padding: "10px", borderBottom: "1px solid #ccc" }}>
    <h2>Microfrontend</h2>
    <button className="btn btn-primary" style={{ marginTop: "10px" }} onClick={onLogout}>Sair</button>
  </div>
);

const Home = ({ addToCart, cartCount, navigateToCart }) => {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const [hoveredProduct, setHoveredProduct] = useState(null);

  useEffect(() => {
    fetch("http://localhost:4000/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Erro ao buscar produtos:", error));
  }, []);

  const filteredProducts = products.filter((product) =>
    product.nome.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mt-3">
      <div style={{ display: "flex", alignItems: "center" }}>
        <h1>Lista de Produtos</h1>
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center" }}>
          <img
            src="https://cdn.pixabay.com/photo/2014/04/02/10/53/shopping-cart-304843_1280.png"
            alt="Carrinho"
            style={{ width: "40px", height: "40px", cursor: "pointer" }}
            onClick={navigateToCart}
          />
          <span style={{ marginLeft: "10px", fontSize: "20px" }}>{cartCount}</span>
        </div>
      </div>

      <input
        type="text"
        placeholder="Buscar produtos..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ width: "100%", padding: "10px", marginTop: "10px" }}
      />
      <br />
      <button className="btn btn-primary" style={{ marginTop: "10px" }}>
        Buscar
      </button>
      <div className="container mt-3">
        <div className="row g-3">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="col-12 col-sm-6 col-md-4 p-2"
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
              style={{ position: "relative" }}
            >
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">{product.nome}</h5>
                  <p className="card-text">R$ {product.preco.toFixed(2)}</p>
                  <button
                    className="btn btn-primary mt-auto w-100"
                    onClick={() => addToCart(product.id)}
                  >
                    Adicionar ao Carrinho
                  </button>
                </div>
              </div>

              {hoveredProduct === product.id && (
                <div
                  style={{
                    position: "absolute",
                    bottom: "110%",
                    left: "50%",
                    transform: "translateX(-50%)",
                    backgroundColor: "black",
                    color: "white",
                    padding: "5px 10px",
                    borderRadius: "5px",
                    whiteSpace: "nowrap",
                    fontSize: "12px",
                    zIndex: 10,
                  }}
                >
                  {product.descricao}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Cart = ({ cartItems }) => {
  return (
    <div>
      <Link to="/product">← Voltar para lista</Link>
      <h1>Carrinho de Compras</h1>
      <table border="1" cellPadding="10" style={{ marginTop: "20px" }}>
        <thead>
          <tr>
            <th>ID do Produto</th>
            <th>Quantidade</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(cartItems).map(([id, quantity]) => (
            <tr key={id}>
              <td>{id}</td>
              <td>{quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const AppRoutes = ({ cartItems, addToCart }) => {
  const navigate = useNavigate();

  const navigateToCart = () => {
    navigate("/checkout/cart");
  };

  const cartCount = Object.values(cartItems).reduce((acc, quantity) => acc + quantity, 0);

  return (
    <Routes>
      <Route
        path="/product"
        element={<Home addToCart={addToCart} cartCount={cartCount} navigateToCart={navigateToCart} />}
      />
      <Route path="/checkout/cart" element={<Cart cartItems={cartItems} />} />
      <Route path="/" element={<Navigate to="/product" />} />
    </Routes>
  );
};

const App = ({ userIdProp }) => {
  const [userId, setUserId] = useState(userIdProp || localStorage.getItem("userId"));
  const [cartItems, setCartItems] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    if (!userId) {
      console.error("userId não foi definido");
      return;
    }
    cartstore.init(userId);
    setCartItems(cartstore.getCart());

    const syncCart = () => setCartItems(cartstore.getCart());
    window.addEventListener("cart-updated", syncCart);
    return () => window.removeEventListener("cart-updated", syncCart);
  }, [userId]);

  const addToCart = (id) => {
    cartstore.addToCart(id);
    setCartItems({ ...cartstore.getCart() });
  };

  const handleLogout = () => {
    localStorage.removeItem("userId");
    cartstore.clearCart();
    setUserId(null);
    navigate("/"); 
  };

  return (
    <div>
      <Header onLogout={handleLogout} />
      <AppRoutes cartItems={cartItems} addToCart={addToCart} />
    </div>
  );
};

const Root = (props) => (
  <BrowserRouter>
    <App {...props} />
  </BrowserRouter>
);

const lifecycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: Root,
  errorBoundary(err, info, props) {
    return <div>Erro ao carregar o aplicativo</div>;
  },
  domElementGetter: () => document.getElementById("app-react"),
});

export const bootstrap = lifecycles.bootstrap;
export const mount = lifecycles.mount;
export const unmount = lifecycles.unmount;
