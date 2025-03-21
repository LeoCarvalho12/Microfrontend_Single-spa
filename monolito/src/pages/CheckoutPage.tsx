import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { getCart } from "../services/cartService";
import { createOrder } from "../services/orderService";
import styles from "../components/styles/CheckoutPage.module.css";

interface CartItem {
  produto_id: number;
  produto: {
    nome: string;
    preco: number;
  };
  quantidade: number;
}

const CheckoutPage = () => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [total, setTotal] = useState(0);

  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  const loadCart = useCallback(async () => {
    if (userId) {
      const data = await getCart(userId);
      const itens = data.itens || [];
      setItems(itens);
      const sum = itens.reduce(
        (acc: number, item: CartItem) =>
          acc + Number(item.produto?.preco || 0) * item.quantidade,
        0
      );
      setTotal(sum);
    }
  }, [userId]);

  useEffect(() => {
    loadCart();
  }, [loadCart]);

  const handleCheckout = async () => {
    try {
      if (!userId) {
        alert("Usuário não autenticado.");
        return;
      }
      await createOrder(userId, total);
      navigate("/checkout/success");
    } catch (error) {
      console.error("Erro ao finalizar compra:", error);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Resumo do Pedido</h2>
      <ul className={styles.list}>
        {items.map((item, index) => (
          <li key={`${item.produto_id}-${index}`} className={styles.item}>
            <span>{item.produto?.nome}</span>
            <span>{item.quantidade}x</span>
            <span>R$ {Number(item.produto?.preco).toFixed(2)}</span>
          </li>
        ))}
      </ul>
      <h3 className={styles.total}>Total: R$ {total.toFixed(2)}</h3>
      <button className={styles.checkoutButton} onClick={handleCheckout}>
        Finalizar Compra
      </button>
    </div>
  );
};

export default CheckoutPage;
