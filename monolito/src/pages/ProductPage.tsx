import { useEffect, useState } from "react";
import { getProducts } from "../services/productService";
import { addToCart } from "../services/cartService";
import { useNavigate } from "react-router-dom";
import { Product } from "../components/types/Product"; 
import styles from "../components/styles/ProductPage.module.css";

const ProductPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);
  const [cartCount, setCartCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    getProducts()
      .then((data: Product[]) => { 
        console.log("Produtos recebidos:", data);
        const formattedProducts = data.map((p) => ({
          ...p,
          preco: Number(p.preco) || 0, 
        }));
        setProducts(formattedProducts);
      })
      .catch(console.error);

    const cartItems = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartCount(cartItems.length);
  }, []);

  const handleAddToCart = async (id: number) => {
    const userId = localStorage.getItem("userId");
    if (!userId) return alert("Você precisa estar logado!");

    try {
      await addToCart(userId, id);
      setCartCount(cartCount + 1);
    } catch (error) {
      console.error("Erro ao adicionar ao carrinho:", error);
    }
  };

  const filteredProducts = products.filter((p) =>
    p.nome.toLowerCase().includes(search.toLowerCase())
  );

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  return (
    <div className={styles.container}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <h1 className={styles.title}>Lista de Produtos</h1>
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center" }}>
          <img
            src="https://cdn.pixabay.com/photo/2014/04/02/10/53/shopping-cart-304843_1280.png"
            alt="Carrinho"
            style={{ width: "40px", height: "40px", cursor: "pointer" }}
            onClick={() => navigate("/cart")}
          />
          <span style={{ marginLeft: "10px", fontSize: "20px" }}>{cartCount}</span>
        </div>
      </div>

      <input
        type="text"
        placeholder="Buscar produtos..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className={styles.searchInput}
      />

      <div className={styles.row}>
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className={styles.card}
            onMouseEnter={() => setHoveredProduct(product.id)}
            onMouseLeave={() => setHoveredProduct(null)}
          >
            <div className={styles.cardBody}>
              <h5 className={styles.cardTitle}>{product.nome}</h5>
              <p className={styles.cardText}>{formatCurrency(product.preco)}</p>
              <button className={styles.addToCart} onClick={() => handleAddToCart(product.id)}>
                Adicionar ao Carrinho
              </button>
            </div>
            {hoveredProduct === product.id && (
              <div className={styles.tooltip}>
                {product.descricao || "Sem descrição"}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductPage;
