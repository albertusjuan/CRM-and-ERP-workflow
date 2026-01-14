/**
 * API Service Loader
 * Automatically loads the correct API service based on APP_MODE
 */

import config from '../config';
import apiBackend from './api'; // Original backend API
import apiDirect from './api-n8n-direct'; // Direct n8n API

// Export the appropriate API based on configuration
const api = config.mode === 'direct' ? apiDirect : apiBackend;

export default api;

// Also export individual functions for convenience
export const {
  processOrder,
  getOrderStatus,
  getAllOrders,
  getInventory,
  getWarehouseInventory,
  getWorkflowStatus,
  getWorkflowStats,
  healthCheck,
  getConfigStatus,
  getConfig,
  updateConfig,
  testN8nConnection,
  testComposioConnection,
  resetConfig,
} = api;

