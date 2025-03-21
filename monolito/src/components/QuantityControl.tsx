import React from "react";
import styles from "../components/styles/QuantityControl.module.css";

interface QuantityControlProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  onRemove: () => void;
}

const QuantityControl: React.FC<QuantityControlProps> = ({ quantity, onIncrease, onDecrease, onRemove }) => {
  return (
    <div className={styles.container}>
      <button className={styles.iconButton} onClick={onRemove}>
        🗑️
      </button>
      <button className={styles.controlButton} onClick={onDecrease} disabled={quantity <= 1}>
        -
      </button>
      <span className={styles.quantity}>{quantity}</span>
      <button className={styles.controlButton} onClick={onIncrease}>
        +
      </button>
    </div>
  );
};

export default QuantityControl;
