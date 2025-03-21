import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { getCart, removeFromCart } from "../services/cartService"; 
import styles from "../components/styles/CartPage.module.css";
import { CartItem } from "../components/types/CartItem";

const CartPage = () => {
  const [items, setItems] = useState<CartItem[]>([]);
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const loadCart = useCallback(async () => {
    if (userId) {
      const data = await getCart(userId);
      setItems(data.itens || []);
    }
  }, [userId]);

  useEffect(() => {
    loadCart();
  }, [loadCart]);

  const handleRemove = async (produtoId: number | undefined) => {
    if (!produtoId) {
      console.error("Erro: produtoId está indefinido ao tentar remover.");
      return;
    }

    if (userId) {
      try {
        await removeFromCart(produtoId, userId);
        await loadCart();
      } catch (error) {
        console.error("Erro ao remover item do carrinho:", error);
      }
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  const getTotal = () => {
    return items.reduce(
      (total, item) => total + item.produto.preco * item.quantidade,
      0
    );
  };

  return (
    <div className={styles.container}>
      <h1>🛒 Carrinho de Compras</h1>
      <button className={styles.backButton} onClick={() => navigate("/products")}>
        ← Voltar para Lista
      </button>

      {items.length > 0 ? (
        <>
          <table className={styles.cartTable}>
            <thead>
              <tr>
                <th>Produto</th>
                <th>Quantidade</th>
                <th>Preço</th>
                <th>Total</th>
                <th>Remover</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.produto.id}>
                  <td>{item.produto.nome}</td>
                  <td>{item.quantidade}</td>
                  <td>{formatCurrency(item.produto.preco)}</td>
                  <td>{formatCurrency(item.produto.preco * item.quantidade)}</td>
                  <td>
                    <button
                      className={styles.removeButton}
                      onClick={() => handleRemove(item.produto.id)}
                      title="Remover produto"
                    >
                      <span role="img" aria-label="remover">🗑️</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <h3 className={styles.total}>Total: {formatCurrency(getTotal())}</h3>

          <button className={styles.payButton} onClick={() => navigate("/checkout")}>
            Ir para Pagamento →
          </button>
        </>
      ) : (
        <p className={styles.emptyMessage}>Seu carrinho está vazio.</p>
      )}
    </div>
  );
};

export default CartPage;
