const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// Process new VIP order
router.post('/process', orderController.processOrder);

// Get order status
router.get('/:orderId', orderController.getOrderStatus);

// Get all orders (for demo)
router.get('/', orderController.getAllOrders);

module.exports = router;

