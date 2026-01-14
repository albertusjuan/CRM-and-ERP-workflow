const express = require('express');
const router = express.Router();
const workflowController = require('../controllers/workflowController');

// Get workflow execution status
router.get('/status', workflowController.getWorkflowStatus);

// Get workflow statistics
router.get('/stats', workflowController.getWorkflowStats);

module.exports = router;

