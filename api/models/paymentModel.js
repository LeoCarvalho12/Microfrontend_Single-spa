module.exports = (sequelize, DataTypes) => {
  const Payment = sequelize.define("Pagamento", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    pedido_id: { 
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "Pedido", key: "id" },
    },
    valor: { type: DataTypes.FLOAT, allowNull: false },
    status: { type: DataTypes.STRING, allowNull: false },
  });

  return Payment;
};
