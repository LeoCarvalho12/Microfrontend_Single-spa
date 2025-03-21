const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

router.post('/new', paymentController.createPayment);
router.get('/', paymentController.getAllPayments);

module.exports = router;
