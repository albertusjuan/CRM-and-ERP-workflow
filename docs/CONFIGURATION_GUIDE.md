# Configuration Guide - Removing Hardcoded Data

## Overview

This guide explains how to remove all hardcoded/demo data and configure the system to work with real n8n workflows and Composio integrations.

## What Was Changed

### 1. **Removed Hardcoded Data**

#### Before (Demo Mode):
- All order processing was mocked
- Fake inventory data
- Simulated processing delays
- Mock API responses

#### After (Real Integration):
- System requires configuration before processing
- All data comes from n8n workflow
- Real API calls to configured endpoints
- Actual order processing through Composio

### 2. **New Configuration System**

Created a configuration management system that:
- Stores n8n webhook URL and API keys
- Stores Composio API credentials
- Tests connections before saving
- Prevents order processing until configured
- Provides clear error messages when not configured

## Setup Instructions

### Step 1: Start n8n

```bash
# In your project directory
npx n8n
```

n8n will start on `http://localhost:5678`

### Step 2: Import the Workflow

1. Open browser to `http://localhost:5678`
2. Click "Workflows" → "+" to create new workflow
3. Click "..." menu → "Import from File"
4. Select `n8n-workflows/vip-order-workflow.json`
5. Click "Import"

### Step 3: Configure Workflow API Endpoints

The workflow has placeholder API endpoints that you need to update:

1. Click on "Workflow Configuration" node
2. Update these values with your real API endpoints:

```
warehouse_a_api: Your Warehouse A inventory API
warehouse_b_api: Your Warehouse B inventory API
tax_api: Tax calculation service API
pdf_api: PDF generation service API
crm_api: Your CRM system API
erp_api: Your ERP system API
notification_api: Email/notification service API
```

### Step 4: Activate the Workflow

1. Toggle the workflow switch to "Active" (top right)
2. Copy the webhook URL from the "Composio Webhook Trigger" node
3. It will look like: `http://localhost:5678/webhook/vip-order`

### Step 5: Get Composio API Key

1. Go to [https://app.composio.dev](https://app.composio.dev)
2. Sign up or log in
3. Navigate to Settings → API Keys
4. Copy your API key

### Step 6: Configure the Backend

#### Option A: Via Settings Page (Recommended)

1. Open the frontend: `http://localhost:3000`
2. Click "Settings" in the navigation
3. Enter your configuration:
   - **n8n Webhook URL**: The URL from Step 4
   - **n8n Base URL**: `http://localhost:5678`
   - **n8n API Key**: (optional, only if your n8n requires authentication)
   - **Composio API Key**: The key from Step 5
   - **Composio Base URL**: `https://api.composio.dev` (default)
4. Click "Test Connection" for each service
5. Click "Save Configuration"

#### Option B: Via Environment Variables

Edit `backend/.env`:

```env
# System will use config API if available, otherwise fall back to env vars
N8N_WEBHOOK_URL=http://localhost:5678/webhook/vip-order
N8N_BASE_URL=http://localhost:5678
N8N_API_KEY=your_n8n_api_key_if_needed

COMPOSIO_API_KEY=your_composio_api_key_here
COMPOSIO_BASE_URL=https://api.composio.dev
```

### Step 7: Test the System

1. Go to Dashboard: `http://localhost:3000/dashboard`
2. Click "Process New Order"
3. Fill in the form (or use defaults)
4. Click "Process Order"
5. Watch the order flow through the n8n workflow

## Architecture Changes

### Backend Changes

#### 1. New Config Controller (`backend/src/controllers/configController.js`)
- Manages API keys and configuration
- Provides endpoints for testing connections
- Stores configuration in memory (can be moved to database)

#### 2. Updated n8n Service (`backend/src/services/n8nService.js`)
```javascript
// Before: Used environment variables
const webhookUrl = process.env.N8N_WEBHOOK_URL;

// After: Uses configuration system
const config = configController.getSystemConfig();
const webhookUrl = config.n8n.webhookUrl;
```

#### 3. Updated Order Controller (`backend/src/controllers/orderController.js`)
```javascript
// Before: Demo mode with hardcoded responses
if (process.env.DEMO_MODE === 'true') {
  return mockResponse;
}

// After: Checks configuration and uses real n8n
if (!config.isConfigured) {
  return error('System not configured');
}
const result = await n8nService.triggerWorkflow(orderData);
```

### Frontend Changes

#### 1. New Settings Page (`frontend/src/pages/SettingsPage.js`)
- Configuration UI for API keys
- Connection testing
- Validation and error handling
- Step-by-step setup guide

#### 2. Updated API Service (`frontend/src/services/api.js`)
- Added config management endpoints
- Added connection testing endpoints

## API Endpoints

### Configuration Endpoints

```
GET  /api/config/status       - Check if system is configured
GET  /api/config              - Get current configuration (no sensitive data)
POST /api/config              - Update configuration
POST /api/config/test/n8n     - Test n8n connection
POST /api/config/test/composio - Test Composio connection
POST /api/config/reset        - Reset configuration (dev only)
```

### Example: Update Configuration

```bash
curl -X POST http://localhost:5000/api/config \
  -H "Content-Type: application/json" \
  -d '{
    "n8n": {
      "webhookUrl": "http://localhost:5678/webhook/vip-order",
      "baseUrl": "http://localhost:5678",
      "apiKey": ""
    },
    "composio": {
      "apiKey": "your-api-key-here",
      "baseUrl": "https://api.composio.dev"
    }
  }'
```

## Error Handling

### System Not Configured

If you try to process an order before configuration:

```json
{
  "success": false,
  "error": "SYSTEM_NOT_CONFIGURED",
  "message": "System is not configured. Please configure n8n and Composio API keys in settings."
}
```

### n8n Connection Failed

If n8n is not running or webhook is incorrect:

```json
{
  "success": false,
  "error": "Cannot connect to n8n",
  "message": "Make sure n8n is running and the workflow is activated"
}
```

## Troubleshooting

### Orders not processing

1. **Check configuration**: Go to `/settings` and verify all fields
2. **Test connections**: Click "Test Connection" buttons
3. **Check n8n**: Make sure n8n is running (`http://localhost:5678`)
4. **Check workflow**: Ensure workflow is activated in n8n
5. **Check logs**: Look at backend console for errors

### n8n connection test fails

1. Verify n8n is running: `netstat -ano | findstr :5678`
2. Check webhook URL is correct
3. Verify workflow is activated
4. Try accessing n8n in browser: `http://localhost:5678`

### Composio API key invalid

1. Check key is copied correctly (no extra spaces)
2. Verify key at [app.composio.dev](https://app.composio.dev)
3. Ensure key has necessary permissions
4. Try regenerating the key

## Production Deployment

For production, consider:

1. **Use Database**: Store configuration in database instead of memory
2. **Encrypt Keys**: Encrypt API keys at rest
3. **Environment Variables**: Use env vars for sensitive data
4. **HTTPS**: Use HTTPS for all API calls
5. **Authentication**: Add user authentication to settings page
6. **Audit Logs**: Log configuration changes

## Next Steps

After configuration:

1. **Customize Workflow**: Modify n8n workflow for your use case
2. **Add Real APIs**: Replace mock warehouse/tax/PDF APIs with real ones
3. **Configure Composio**: Set up your app integrations in Composio
4. **Test Thoroughly**: Test with real data before production
5. **Monitor**: Set up monitoring and alerting

## Support

If you need help:
1. Check n8n logs: Terminal where n8n is running
2. Check backend logs: Terminal where backend is running
3. Check browser console: F12 → Console tab
4. Review workflow executions in n8n UI

---

**All hardcoded data has been removed. The system now waits for your configuration!**

