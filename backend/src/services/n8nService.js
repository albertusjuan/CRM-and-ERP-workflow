const axios = require('axios');
const configController = require('../controllers/configController');

/**
 * Trigger n8n workflow
 */
exports.triggerWorkflow = async (orderData) => {
  try {
    // Get system configuration
    const config = configController.getSystemConfig();
    
    // Check if system is configured
    if (!config.isConfigured || !config.n8n.webhookUrl) {
      return {
        success: false,
        error: 'System not configured',
        message: 'Please configure n8n webhook URL in the settings'
      };
    }

    const response = await axios.post(config.n8n.webhookUrl, orderData, {
      headers: {
        'Content-Type': 'application/json',
        ...(config.n8n.apiKey && {
          'Authorization': `Bearer ${config.n8n.apiKey}`
        })
      },
      timeout: 30000
    });

    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    console.error('n8n service error:', error.message);
    return {
      success: false,
      error: error.message,
      details: error.response?.data
    };
  }
};

/**
 * Get workflow execution status
 */
exports.getExecutionStatus = async (executionId) => {
  try {
    const config = configController.getSystemConfig();
    
    if (!config.isConfigured || !config.n8n.baseUrl) {
      throw new Error('N8N configuration not complete');
    }

    const response = await axios.get(`${config.n8n.baseUrl}/api/v1/executions/${executionId}`, {
      headers: {
        'Authorization': `Bearer ${config.n8n.apiKey}`
      }
    });

    return response.data;
  } catch (error) {
    console.error('Get execution status error:', error.message);
    throw error;
  }
};

