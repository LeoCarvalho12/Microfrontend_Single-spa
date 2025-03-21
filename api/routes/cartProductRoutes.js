const express = require('express');
const router = express.Router();
const cartProductController = require('../controllers/cartProductController');

router.post('/add', cartProductController.addProductToCart);
router.post('/remove', cartProductController.removeProductFromCart);
router.post('/update', cartProductController.updateProductQuantity);
router.get('/:usuario_id', cartProductController.getCartProducts);
router.get('/create', cartProductController.createCart);

module.exports = router;
