const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");

router.post("/create", orderController.createOrder);
router.post("/update-status", orderController.updateOrderStatus);
router.get("/", orderController.getAllOrders);

module.exports = router;
