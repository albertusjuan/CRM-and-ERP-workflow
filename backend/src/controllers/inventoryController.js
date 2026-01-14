/**
 * Mock inventory data for demo
 */
const mockInventory = {
  warehouseA: {
    name: 'Warehouse A - East Coast',
    location: 'New York, NY',
    items: [
      { sku: 'PROD-001', name: 'Premium Widget', stock: 150, price: 99.99 },
      { sku: 'PROD-002', name: 'Deluxe Gadget', stock: 75, price: 149.99 },
      { sku: 'PROD-003', name: 'Standard Tool', stock: 200, price: 49.99 },
      { sku: 'PROD-004', name: 'Pro Equipment', stock: 50, price: 299.99 }
    ],
    averageShippingTime: 2,
    shippingCost: 15.00
  },
  warehouseB: {
    name: 'Warehouse B - West Coast',
    location: 'Los Angeles, CA',
    items: [
      { sku: 'PROD-001', name: 'Premium Widget', stock: 200, price: 99.99 },
      { sku: 'PROD-002', name: 'Deluxe Gadget', stock: 100, price: 149.99 },
      { sku: 'PROD-003', name: 'Standard Tool', stock: 50, price: 49.99 },
      { sku: 'PROD-004', name: 'Pro Equipment', stock: 125, price: 299.99 }
    ],
    averageShippingTime: 3,
    shippingCost: 12.00
  }
};

/**
 * Get inventory for all warehouses
 */
exports.getInventory = async (req, res) => {
  try {
    res.json({
      success: true,
      timestamp: new Date().toISOString(),
      warehouses: mockInventory
    });
  } catch (error) {
    console.error('Get inventory error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

/**
 * Get inventory for specific warehouse
 */
exports.getWarehouseInventory = async (req, res) => {
  try {
    const { warehouse } = req.params;
    const warehouseKey = `warehouse${warehouse.toUpperCase()}`;
    
    const warehouseData = mockInventory[warehouseKey];
    
    if (!warehouseData) {
      return res.status(404).json({
        success: false,
        message: 'Warehouse not found'
      });
    }

    res.json({
      success: true,
      timestamp: new Date().toISOString(),
      warehouse: warehouseData
    });
  } catch (error) {
    console.error('Get warehouse inventory error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

