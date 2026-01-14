const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventoryController');

// Get inventory levels
router.get('/', inventoryController.getInventory);

// Get warehouse-specific inventory
router.get('/:warehouse', inventoryController.getWarehouseInventory);

module.exports = router;

