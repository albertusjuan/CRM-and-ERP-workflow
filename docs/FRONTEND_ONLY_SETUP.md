# Frontend-Only Setup (No Backend)

## Overview

This guide shows how to use n8n directly from the frontend, removing the need for the backend service.

## Architecture

```
Frontend (React) → n8n Webhook → n8n Workflow → External APIs
```

## Step 1: Update Frontend API Service

Update `frontend/src/services/api.js` to call n8n directly:

```javascript
import axios from 'axios';

// n8n webhook URL (get from your workflow)
const N8N_WEBHOOK_URL = process.env.REACT_APP_N8N_WEBHOOK_URL || 'http://localhost:5678/webhook/process-vip-order';

const api = axios.create({
  baseURL: N8N_WEBHOOK_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Process order directly through n8n
export const processOrder = (orderData) => {
  return api.post('/', orderData);
};

// For other data, you could create separate n8n webhooks
// or use local state management in React

export default {
  processOrder
};
```

## Step 2: Update Frontend .env

Create/update `frontend/.env`:

```env
REACT_APP_N8N_WEBHOOK_URL=http://localhost:5678/webhook/process-vip-order
```

## Step 3: Update Dashboard Component

Update `frontend/src/pages/DashboardPage.js`:

```javascript
const handleProcessOrder = async (orderData) => {
  try {
    setProcessing(true);
    
    // Call n8n directly
    const response = await api.processOrder({
      orderId: generateOrderId(),
      customerId: orderData.customerId,
      items: orderData.items,
      shippingAddress: orderData.shippingAddress,
      customerTier: orderData.isVIP ? 'vip' : 'standard',
      timestamp: new Date().toISOString()
    });

    if (response.data.status === 'success') {
      alert('Order processed successfully!');
      // Update local state
      setOrders(prev => [...prev, response.data]);
    } else {
      alert('Order processing failed: ' + response.data.message);
    }
  } catch (error) {
    alert('Error: ' + error.message);
  } finally {
    setProcessing(false);
  }
};
```

## Step 4: Configure n8n Workflow

1. Import your workflow: `AI-Driven Business Process Orchestration with Composio and n8n Integration.json`
2. Update the "Workflow Configuration" node with real API endpoints:
   - `warehouseAUrl`: Your Warehouse A API
   - `warehouseBUrl`: Your Warehouse B API
   - `taxApiUrl`: Tax calculation API
   - `pdfGeneratorUrl`: PDF generation API
   - `crmApiUrl`: CRM API
   - `erpApiUrl`: ERP API
   - `notificationUrl`: Notification API
3. Activate the workflow
4. Copy the webhook URL from "Composio Webhook Trigger" node
5. Update `frontend/.env` with that URL

## Step 5: Start Only Frontend and n8n

```bash
# Terminal 1: Start n8n
npx n8n

# Terminal 2: Start frontend
cd frontend
npm start
```

**No backend needed!**

## Pros & Cons

### ✅ Advantages
- Simpler setup (only 2 services: frontend + n8n)
- Less code to maintain
- Faster iteration
- Perfect for MVP/demo

### ⚠️ Limitations
- n8n URL exposed to users (can see in Network tab)
- No authentication layer
- No data validation before n8n
- Can't easily store order history
- Hard to implement rate limiting

## Security Considerations

### For Development:
- ✅ This approach is fine

### For Production:
- ⚠️ Use n8n's built-in authentication
- ⚠️ Use HTTPS only
- ⚠️ Add CORS restrictions in n8n
- ⚠️ Consider using n8n cloud (managed security)
- ⚠️ Or add a simple authentication layer

## Alternative: Minimal Backend

If you need some backend features but want to keep it simple:

```javascript
// minimal-backend/index.js
const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

app.post('/api/orders/process', async (req, res) => {
  // Optional: Add authentication here
  // Optional: Validate data here
  
  try {
    const response = await axios.post(
      process.env.N8N_WEBHOOK_URL,
      req.body
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(5000);
```

This gives you:
- ✅ Hidden n8n URL
- ✅ Single place to add auth/validation
- ✅ Still very simple (< 30 lines)

## Recommendation

**For your use case:**

Since you already have a complete n8n workflow, I recommend:

1. **Start with frontend-only** (no backend)
2. **Test and iterate** on your workflow
3. **Add minimal backend later** only if you need:
   - User authentication
   - Order history storage
   - Rate limiting
   - Multiple workflows

**The backend we built is optional for you!**

## What to Remove

If you go frontend-only:

1. Don't start the backend service
2. Update `frontend/src/services/api.js` to point to n8n
3. Remove or ignore the entire `backend/` folder
4. Update `README.md` to reflect frontend-only setup

Your n8n workflow is already production-ready!

