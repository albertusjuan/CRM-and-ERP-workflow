const { v4: uuidv4 } = require('uuid');
const n8nService = require('../services/n8nService');

// In-memory storage for demo purposes
const orders = new Map();

/**
 * Process a new VIP order
 */
exports.processOrder = async (req, res) => {
  try {
    const orderData = req.body;
    
    // Generate order ID if not provided
    const orderId = orderData.orderId || uuidv4();
    
    // Add metadata
    const enrichedOrder = {
      ...orderData,
      orderId,
      isVIP: orderData.isVIP !== undefined ? orderData.isVIP : true,
      timestamp: new Date().toISOString(),
      status: 'processing'
    };

    // Store order
    orders.set(orderId, enrichedOrder);

    // Check if demo mode
    if (process.env.DEMO_MODE === 'true') {
      // Simulate processing delay
      setTimeout(() => {
        const mockResult = {
          success: true,
          orderId,
          message: 'VIP order processed successfully (Demo Mode)',
          warehouse: 'A',
          invoiceUrl: `https://demo.wyntech.com/invoices/${orderId}.pdf`,
          total: orderData.totalAmount * 1.1, // Including tax
          processingTime: '2.3s'
        };
        
        orders.set(orderId, {
          ...enrichedOrder,
          status: 'completed',
          result: mockResult
        });
      }, 2000);

      return res.json({
        success: true,
        orderId,
        message: 'Order submitted for processing (Demo Mode)',
        status: 'processing'
      });
    }

    // Send to n8n workflow
    const result = await n8nService.triggerWorkflow(enrichedOrder);
    
    // Update order with result
    orders.set(orderId, {
      ...enrichedOrder,
      status: result.success ? 'completed' : 'failed',
      result
    });

    res.json({
      success: true,
      orderId,
      message: 'Order submitted for processing',
      workflowResult: result
    });

  } catch (error) {
    console.error('Order processing error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

/**
 * Get order status by ID
 */
exports.getOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    
    const order = orders.get(orderId);
    
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    res.json({
      success: true,
      order
    });

  } catch (error) {
    console.error('Get order status error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

/**
 * Get all orders (for demo dashboard)
 */
exports.getAllOrders = async (req, res) => {
  try {
    const allOrders = Array.from(orders.values());
    
    res.json({
      success: true,
      count: allOrders.length,
      orders: allOrders
    });

  } catch (error) {
    console.error('Get all orders error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

