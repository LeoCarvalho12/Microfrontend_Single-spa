const express = require('express');
const app = express();
const cors = require('cors');

const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes');

app.use(cors());
app.use(express.json()); 

app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes); 

module.exports = app;
