/**
 * Configuration Controller
 * Manages API keys and system configuration
 */

// In-memory configuration storage (in production, use database or environment variables)
let systemConfig = {
  isConfigured: false,
  n8n: {
    webhookUrl: '',
    apiKey: '',
    baseUrl: ''
  },
  composio: {
    apiKey: '',
    baseUrl: ''
  },
  configuredAt: null
};

/**
 * Get current configuration status
 */
exports.getConfigStatus = async (req, res) => {
  try {
    res.json({
      success: true,
      isConfigured: systemConfig.isConfigured,
      hasN8nConfig: !!(systemConfig.n8n.webhookUrl && systemConfig.n8n.baseUrl),
      hasComposioConfig: !!systemConfig.composio.apiKey,
      configuredAt: systemConfig.configuredAt
    });
  } catch (error) {
    console.error('Get config status error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

/**
 * Get configuration (without sensitive data)
 */
exports.getConfig = async (req, res) => {
  try {
    res.json({
      success: true,
      config: {
        n8n: {
          webhookUrl: systemConfig.n8n.webhookUrl || '',
          baseUrl: systemConfig.n8n.baseUrl || '',
          hasApiKey: !!systemConfig.n8n.apiKey
        },
        composio: {
          baseUrl: systemConfig.composio.baseUrl || 'https://api.composio.dev',
          hasApiKey: !!systemConfig.composio.apiKey
        },
        isConfigured: systemConfig.isConfigured
      }
    });
  } catch (error) {
    console.error('Get config error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

/**
 * Update configuration
 */
exports.updateConfig = async (req, res) => {
  try {
    const { n8n, composio } = req.body;

    // Validate required fields
    if (!n8n?.webhookUrl || !n8n?.baseUrl) {
      return res.status(400).json({
        success: false,
        message: 'n8n webhook URL and base URL are required'
      });
    }

    if (!composio?.apiKey) {
      return res.status(400).json({
        success: false,
        message: 'Composio API key is required'
      });
    }

    // Update configuration
    systemConfig = {
      isConfigured: true,
      n8n: {
        webhookUrl: n8n.webhookUrl,
        apiKey: n8n.apiKey || '',
        baseUrl: n8n.baseUrl
      },
      composio: {
        apiKey: composio.apiKey,
        baseUrl: composio.baseUrl || 'https://api.composio.dev'
      },
      configuredAt: new Date().toISOString()
    };

    res.json({
      success: true,
      message: 'Configuration updated successfully',
      isConfigured: true
    });

  } catch (error) {
    console.error('Update config error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

/**
 * Test n8n connection
 */
exports.testN8nConnection = async (req, res) => {
  try {
    const { webhookUrl } = req.body;

    if (!webhookUrl) {
      return res.status(400).json({
        success: false,
        message: 'Webhook URL is required'
      });
    }

    // Test the webhook with a simple ping
    const axios = require('axios');
    
    try {
      await axios.post(webhookUrl, {
        test: true,
        message: 'Connection test from backend'
      }, {
        timeout: 5000
      });

      res.json({
        success: true,
        message: 'n8n connection successful'
      });
    } catch (error) {
      res.json({
        success: false,
        message: `Cannot connect to n8n: ${error.message}`,
        hint: 'Make sure n8n is running and the workflow is activated'
      });
    }

  } catch (error) {
    console.error('Test n8n connection error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

/**
 * Test Composio connection
 */
exports.testComposioConnection = async (req, res) => {
  try {
    const { apiKey } = req.body;

    if (!apiKey) {
      return res.status(400).json({
        success: false,
        message: 'API key is required'
      });
    }

    // Test the Composio API
    const axios = require('axios');
    
    try {
      await axios.get('https://api.composio.dev/v1/health', {
        headers: {
          'Authorization': `Bearer ${apiKey}`
        },
        timeout: 5000
      });

      res.json({
        success: true,
        message: 'Composio API key is valid'
      });
    } catch (error) {
      res.json({
        success: false,
        message: `Invalid Composio API key: ${error.response?.data?.message || error.message}`,
        hint: 'Check your API key at https://app.composio.dev'
      });
    }

  } catch (error) {
    console.error('Test Composio connection error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

/**
 * Get system configuration (internal use)
 */
exports.getSystemConfig = () => {
  return systemConfig;
};

/**
 * Reset configuration (for testing/development)
 */
exports.resetConfig = async (req, res) => {
  try {
    systemConfig = {
      isConfigured: false,
      n8n: {
        webhookUrl: '',
        apiKey: '',
        baseUrl: ''
      },
      composio: {
        apiKey: '',
        baseUrl: ''
      },
      configuredAt: null
    };

    res.json({
      success: true,
      message: 'Configuration reset successfully'
    });

  } catch (error) {
    console.error('Reset config error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

