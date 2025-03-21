const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController'); 

if (!productController.getAllProducts) {
  throw new Error("ERRO: Função 'getAllProducts' não encontrada em productController.js");
}

router.get('/product', productController.getAllProducts);

router.get('/:id', productController.getProductById);

router.post('/newproducts', productController.createProduct);

router.put('/:id', productController.updateProduct);

router.delete('/:id', productController.deleteProduct);

module.exports = router;
