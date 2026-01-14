# Backend API - Composio + n8n MVP

## Overview

Node.js/Express backend API that integrates with n8n workflows and handles order processing, inventory management, and system orchestration.

## Features

- RESTful API endpoints for order processing
- n8n workflow integration
- Mock inventory management
- Webhook handlers for Composio and n8n
- Demo mode for testing without live integrations

## Setup

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Edit .env with your configuration
# Set DEMO_MODE=true for testing without live services

# Run in development mode
npm run dev

# Run in production mode
npm start
```

## API Endpoints

### Orders
- `POST /api/orders/process` - Process new VIP order
- `GET /api/orders/:orderId` - Get order status
- `GET /api/orders` - Get all orders

### Inventory
- `GET /api/inventory` - Get all warehouse inventory
- `GET /api/inventory/:warehouse` - Get specific warehouse inventory

### Workflow
- `GET /api/workflow/status` - Get workflow execution status
- `GET /api/workflow/stats` - Get workflow statistics

### Webhooks
- `POST /api/webhook/n8n` - Handle n8n webhook responses
- `POST /api/webhook/composio` - Handle Composio webhooks

### System
- `GET /health` - Health check
- `GET /` - API information

## Environment Variables

```env
PORT=5000
N8N_WEBHOOK_URL=http://localhost:5678/webhook/vip-order
N8N_API_KEY=your_api_key
COMPOSIO_API_KEY=your_api_key
DEMO_MODE=true
```

## Demo Mode

When `DEMO_MODE=true`, the API will:
- Return mock responses without calling external services
- Simulate processing delays
- Generate fake order results

Perfect for demonstrations and testing!

## Testing

```bash
# Test order processing
curl -X POST http://localhost:5000/api/orders/process \
  -H "Content-Type: application/json" \
  -d '{
    "customerId": "CUST-001",
    "customerEmail": "vip@example.com",
    "isVIP": true,
    "items": [
      {"sku": "PROD-001", "quantity": 2}
    ],
    "shippingAddress": {
      "street": "123 Main St",
      "city": "New York",
      "state": "NY",
      "zip": "10001"
    },
    "totalAmount": 199.98
  }'
```

