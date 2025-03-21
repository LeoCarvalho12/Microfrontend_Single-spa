module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    usuario_id: { type: DataTypes.INTEGER, allowNull: false },
    status: { type: DataTypes.ENUM('PENDENTE', 'FINALIZADO', 'CANCELADO'), allowNull: false }
  }, { tableName: 'pedido', timestamps: false });

  return Order;
};
