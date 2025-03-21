import { useNavigate } from "react-router-dom";
import styles from "../components/styles/CheckoutSuccess.module.css";

const CheckoutSuccessPage = () => {
  const navigate = useNavigate();

  const handleBackToProducts = () => {
    navigate("/products");
  };

  const handleLogout = () => {
    localStorage.removeItem("userId");
    navigate("/login");
  };

  return (
    <div className={styles.container}>
      <h1>Compra Concluída com Sucesso!</h1>
      <p>Obrigado pela sua compra. Seu pedido foi processado.</p>

      <div className={styles.actions}>
        <button className={styles.button} onClick={handleBackToProducts}>
          ← Voltar para Lista
        </button>
        <button className={styles.logoutButton} onClick={handleLogout}>
          Sair
        </button>
      </div>
    </div>
  );
};

export default CheckoutSuccessPage;
