const axios = require('axios');

/**
 * Trigger n8n workflow
 */
exports.triggerWorkflow = async (orderData) => {
  try {
    const webhookUrl = process.env.N8N_WEBHOOK_URL;
    
    if (!webhookUrl) {
      throw new Error('N8N_WEBHOOK_URL not configured');
    }

    const response = await axios.post(webhookUrl, orderData, {
      headers: {
        'Content-Type': 'application/json',
        ...(process.env.N8N_API_KEY && {
          'Authorization': `Bearer ${process.env.N8N_API_KEY}`
        })
      },
      timeout: 30000
    });

    return response.data;
  } catch (error) {
    console.error('n8n service error:', error.message);
    throw error;
  }
};

/**
 * Get workflow execution status
 */
exports.getExecutionStatus = async (executionId) => {
  try {
    const baseUrl = process.env.N8N_BASE_URL;
    const apiKey = process.env.N8N_API_KEY;
    
    if (!baseUrl || !apiKey) {
      throw new Error('N8N configuration not complete');
    }

    const response = await axios.get(`${baseUrl}/api/v1/executions/${executionId}`, {
      headers: {
        'Authorization': `Bearer ${apiKey}`
      }
    });

    return response.data;
  } catch (error) {
    console.error('Get execution status error:', error.message);
    throw error;
  }
};

