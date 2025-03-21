const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

router.get('/:id', cartController.getCartByUser);
router.post('/add', cartController.addToCart);
router.post("/create", cartController.createCart);
router.delete('/remove/:produtoId', cartController.removeFromCart);
router.post('/checkout', cartController.checkout);

module.exports = router;
