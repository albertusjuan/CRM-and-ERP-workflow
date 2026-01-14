const express = require('express');
const router = express.Router();
const configController = require('../controllers/configController');

// Get configuration status
router.get('/status', configController.getConfigStatus);

// Get configuration (without sensitive data)
router.get('/', configController.getConfig);

// Update configuration
router.post('/', configController.updateConfig);

// Test n8n connection
router.post('/test/n8n', configController.testN8nConnection);

// Test Composio connection
router.post('/test/composio', configController.testComposioConnection);

// Reset configuration (for development)
router.post('/reset', configController.resetConfig);

module.exports = router;

