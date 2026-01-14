import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Orders
export const processOrder = (orderData) => {
  return api.post('/api/orders/process', orderData);
};

export const getOrderStatus = (orderId) => {
  return api.get(`/api/orders/${orderId}`);
};

export const getAllOrders = () => {
  return api.get('/api/orders');
};

// Inventory
export const getInventory = () => {
  return api.get('/api/inventory');
};

export const getWarehouseInventory = (warehouse) => {
  return api.get(`/api/inventory/${warehouse}`);
};

// Workflow
export const getWorkflowStatus = () => {
  return api.get('/api/workflow/status');
};

export const getWorkflowStats = () => {
  return api.get('/api/workflow/stats');
};

// Health check
export const healthCheck = () => {
  return api.get('/health');
};

// Configuration
export const getConfigStatus = () => {
  return api.get('/api/config/status');
};

export const getConfig = () => {
  return api.get('/api/config');
};

export const updateConfig = (configData) => {
  return api.post('/api/config', configData);
};

export const testN8nConnection = (webhookUrl) => {
  return api.post('/api/config/test/n8n', { webhookUrl });
};

export const testComposioConnection = (apiKey) => {
  return api.post('/api/config/test/composio', { apiKey });
};

export const resetConfig = () => {
  return api.post('/api/config/reset');
};

export default {
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
};

