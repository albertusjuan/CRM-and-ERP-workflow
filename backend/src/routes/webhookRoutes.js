const express = require('express');
const router = express.Router();
const webhookController = require('../controllers/webhookController');

// Handle n8n webhook responses
router.post('/n8n', webhookController.handleN8nWebhook);

// Handle Composio webhook
router.post('/composio', webhookController.handleComposioWebhook);

module.exports = router;

