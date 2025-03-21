const express = require('express');
const app = express();
const cors = require('cors');

const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const cartRoutes = require('./routes/cartRoutes');
const cartProductRoutes = require('./routes/cartProductRoutes');
const orderRoutes = require('./routes/orderRoutes');
const paymentRoutes = require('./routes/paymentRoutes');

app.use(cors());
app.use(express.json()); 

app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes); 
app.use('/api/categories', categoryRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/cart-product', cartProductRoutes);
app.use('/api/order', orderRoutes);
app.use('/api/payment', paymentRoutes);

module.exports = app;
