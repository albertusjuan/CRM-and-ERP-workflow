/**
 * Application Configuration
 * 
 * MODE: Choose between 'backend' or 'direct'
 * - 'backend': Uses Express backend as intermediary (3-tier: Frontend → Backend → n8n)
 * - 'direct': Calls n8n directly from frontend (2-tier: Frontend → n8n)
 */

export const APP_MODE = process.env.REACT_APP_MODE || 'direct'; // 'backend' or 'direct'

export const config = {
  mode: APP_MODE,
  
  // For 'backend' mode
  backend: {
    apiUrl: process.env.REACT_APP_API_URL || 'http://localhost:5000'
  },
  
  // For 'direct' mode
  n8n: {
    webhookUrl: process.env.REACT_APP_N8N_WEBHOOK_URL || 'http://localhost:5678/webhook/process-vip-order',
    apiKey: process.env.REACT_APP_N8N_API_KEY || ''
  }
};

console.log(`🚀 App Mode: ${APP_MODE.toUpperCase()}`);
console.log(APP_MODE === 'direct' ? `📍 n8n Webhook: ${config.n8n.webhookUrl}` : `📍 Backend API: ${config.backend.apiUrl}`);

export default config;

