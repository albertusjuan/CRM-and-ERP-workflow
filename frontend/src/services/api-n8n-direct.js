import axios from 'axios';

/**
 * Frontend-Only API Service
 * This version calls n8n directly without a backend
 * 
 * Setup:
 * 1. Create a .env file in frontend/ folder
 * 2. Add: REACT_APP_N8N_WEBHOOK_URL=http://localhost:5678/webhook/process-vip-order
 * 3. Replace the webhook URL with your actual n8n webhook URL
 */

// n8n Configuration
const N8N_WEBHOOK_URL = process.env.REACT_APP_N8N_WEBHOOK_URL || 'http://localhost:5678/webhook/process-vip-order';
const N8N_API_KEY = process.env.REACT_APP_N8N_API_KEY || '';

console.log('🔧 n8n Direct Mode - Webhook URL:', N8N_WEBHOOK_URL);

/**
 * Process order directly through n8n workflow
 */
export const processOrder = async (orderData) => {
  try {
    const response = await axios.post(N8N_WEBHOOK_URL, {
      orderId: orderData.orderId || `ORD-${Date.now()}`,
      customerId: orderData.customerId,
      items: orderData.items,
      shippingAddress: orderData.shippingAddress,
      customerTier: orderData.isVIP ? 'vip' : 'standard',
      timestamp: new Date().toISOString(),
      ...orderData
    }, {
      headers: {
        'Content-Type': 'application/json',
        ...(N8N_API_KEY && { 'X-N8N-API-KEY': N8N_API_KEY })
      },
      timeout: 30000
    });

    return { data: response.data };
  } catch (error) {
    console.error('n8n API Error:', error);
    throw error;
  }
};

/**
 * Get order status (mock - stores in local state)
 * In frontend-only mode, we use React state to track orders
 */
export const getOrderStatus = (orderId) => {
  // This would need to be handled in React component state
  return Promise.resolve({ 
    data: { 
      message: 'Order status tracking not available in frontend-only mode. Use React state instead.' 
    } 
  });
};

/**
 * Get all orders (mock - stores in local state)
 */
export const getAllOrders = () => {
  // This would need to be handled in React component state
  return Promise.resolve({ 
    data: { 
      orders: [],
      message: 'Order history not available in frontend-only mode. Use React state instead.' 
    } 
  });
};

/**
 * Mock inventory data (for demo purposes)
 * In production, you'd create a separate n8n webhook for this
 */
export const getInventory = () => {
  return Promise.resolve({
    data: {
      warehouses: [
        {
          id: 'warehouse-a',
          name: 'Warehouse A - West Coast',
          location: 'Los Angeles, CA',
          available: true,
          stockLevel: 85
        },
        {
          id: 'warehouse-b',
          name: 'Warehouse B - East Coast',
          location: 'New York, NY',
          available: true,
          stockLevel: 72
        }
      ]
    }
  });
};

export const getWarehouseInventory = (warehouse) => {
  return getInventory();
};

/**
 * Mock workflow status (for demo)
 * In production, you could create a separate n8n webhook to check status
 */
export const getWorkflowStatus = () => {
  return Promise.resolve({
    data: {
      status: 'active',
      workflowName: 'AI-Driven Business Process Orchestration',
      lastExecution: new Date().toISOString(),
      executionCount: Math.floor(Math.random() * 100) + 50
    }
  });
};

export const getWorkflowStats = () => {
  return Promise.resolve({
    data: {
      totalExecutions: Math.floor(Math.random() * 1000) + 500,
      successfulExecutions: Math.floor(Math.random() * 900) + 450,
      failedExecutions: Math.floor(Math.random() * 100) + 10,
      avgExecutionTime: '2.3s'
    }
  });
};

/**
 * Health check (ping n8n)
 */
export const healthCheck = async () => {
  try {
    // Simple check if n8n webhook is accessible
    await axios.get(N8N_WEBHOOK_URL.replace('/webhook', ''), { timeout: 5000 });
    return { data: { status: 'ok', message: 'n8n is accessible' } };
  } catch (error) {
    return { data: { status: 'error', message: 'Cannot reach n8n' } };
  }
};

// Not needed in frontend-only mode
export const getConfigStatus = () => Promise.resolve({ data: { isConfigured: true } });
export const getConfig = () => Promise.resolve({ data: {} });
export const updateConfig = () => Promise.resolve({ data: {} });
export const testN8nConnection = () => Promise.resolve({ data: {} });
export const testComposioConnection = () => Promise.resolve({ data: {} });
export const resetConfig = () => Promise.resolve({ data: {} });

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

