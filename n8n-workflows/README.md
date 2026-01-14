# n8n Workflows

## VIP Order Processing Workflow

This directory contains the n8n workflow configuration for the Composio + n8n MVP demo.

## Workflow File

- `vip-order-workflow.json` - Complete VIP order processing workflow

## Importing to n8n

### Method 1: Via n8n UI

1. Open n8n dashboard (http://localhost:5678)
2. Click "Add workflow" or open existing workflow
3. Click the three dots menu (⋮) → "Import from File"
4. Select `vip-order-workflow.json`
5. Click "Import"

### Method 2: Via n8n CLI

```bash
# If using Docker
docker exec composio-n8n n8n import:workflow --input=/workflows/vip-order-workflow.json

# If using local n8n
n8n import:workflow --input=./n8n-workflows/vip-order-workflow.json
```

## Workflow Overview

### Trigger
**Composio Webhook Trigger**
- Listens for POST requests at `/webhook/vip-order`
- Receives order data from Composio

### Processing Steps

1. **Workflow Configuration**
   - Sets up API endpoints for all services
   - Configures warehouse, tax, PDF, CRM, ERP, and notification APIs

2. **Parse Order Data**
   - Extracts order details
   - Validates data structure
   - Prepares for processing

3. **Inventory Check (Parallel)**
   - Check Warehouse A inventory
   - Check Warehouse B inventory
   - Runs simultaneously for efficiency

4. **Warehouse Selection**
   - Combines inventory results
   - Calculates optimal warehouse based on:
     - Stock availability
     - Shipping time
     - Shipping cost
     - Stock levels

5. **Stock Validation**
   - Verifies product availability
   - Branches workflow based on result

6. **Order Fulfillment (If Stock Available)**
   - Calculate applicable taxes
   - Prepare invoice with VIP discount
   - Generate PDF invoice
   - Update CRM system
   - Update ERP system
   - Send customer notification

7. **Response Handling**
   - Format success response
   - Or format out-of-stock response
   - Return result to Composio

## Node Configuration

### HTTP Request Nodes

All HTTP request nodes use the following pattern:

```javascript
URL: {{ $node["Workflow Configuration"].json["api_endpoint"] }}
Method: POST
Authentication: Generic Credential Type (if needed)
Timeout: 10000ms
```

### Code Nodes

JavaScript code nodes handle:
- Data parsing and transformation
- Business logic (warehouse selection, discount calculation)
- Response formatting

## Testing the Workflow

### Sample Order Payload

```json
{
  "orderId": "ORD-12345",
  "customerId": "CUST-001",
  "customerEmail": "vip@example.com",
  "isVIP": true,
  "items": [
    {
      "sku": "PROD-001",
      "name": "Premium Widget",
      "quantity": 2,
      "price": 99.99
    }
  ],
  "shippingAddress": {
    "street": "123 Main St",
    "city": "New York",
    "state": "NY",
    "zip": "10001",
    "country": "USA"
  },
  "totalAmount": 199.98
}
```

### Testing with curl

```bash
curl -X POST http://localhost:5678/webhook/vip-order \
  -H "Content-Type: application/json" \
  -d '{
    "orderId": "TEST-001",
    "customerId": "CUST-001",
    "customerEmail": "test@example.com",
    "isVIP": true,
    "items": [{"sku": "PROD-001", "quantity": 2, "price": 99.99}],
    "shippingAddress": {"city": "New York", "state": "NY"},
    "totalAmount": 199.98
  }'
```

## Customization

### Adding New API Endpoints

1. Update "Workflow Configuration" node
2. Add new string values with endpoint URLs
3. Reference in HTTP Request nodes: `{{ $node["Workflow Configuration"].json["your_api_key"] }}`

### Modifying Business Logic

Edit the JavaScript code in Code nodes:
- **Determine Best Warehouse**: Modify warehouse selection algorithm
- **Prepare Invoice Data**: Adjust discount calculations
- **Format Responses**: Customize response structure

### Adding Credentials

1. Go to n8n Credentials
2. Add new credential (API Key, OAuth, etc.)
3. Select credential in HTTP Request nodes

## Troubleshooting

### Webhook not triggering
- Check n8n is running: `http://localhost:5678`
- Verify webhook URL matches trigger configuration
- Check n8n logs for errors

### HTTP Request failures
- Verify API endpoints in Workflow Configuration
- Check authentication credentials
- Ensure external APIs are accessible
- Review timeout settings

### Workflow execution errors
- Check n8n execution logs
- Verify data format between nodes
- Test individual nodes in isolation

## Production Considerations

1. **Security**
   - Use environment variables for sensitive data
   - Enable n8n authentication
   - Use HTTPS for webhooks

2. **Monitoring**
   - Set up execution error notifications
   - Monitor execution times
   - Track success/failure rates

3. **Scaling**
   - Configure execution concurrency
   - Optimize HTTP request timeouts
   - Use queue mode for high volume

4. **Integration**
   - Replace mock APIs with real endpoints
   - Configure actual credentials
   - Test error handling scenarios

