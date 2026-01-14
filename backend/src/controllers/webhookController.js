/**
 * Handle n8n webhook responses
 */
exports.handleN8nWebhook = async (req, res) => {
  try {
    const data = req.body;
    
    console.log('Received n8n webhook:', data);
    
    // Process webhook data
    // In a real application, you would update order status, notify clients, etc.
    
    res.json({
      success: true,
      message: 'Webhook received successfully',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('n8n webhook error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

/**
 * Handle Composio webhook
 */
exports.handleComposioWebhook = async (req, res) => {
  try {
    const data = req.body;
    
    console.log('Received Composio webhook:', data);
    
    // Process Composio webhook data
    
    res.json({
      success: true,
      message: 'Composio webhook received successfully',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Composio webhook error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

