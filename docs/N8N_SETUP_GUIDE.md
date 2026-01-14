# n8n Setup Guide

## Step 1: Start n8n

n8n is currently starting in the background (Terminal 7). Wait about 1-2 minutes for it to fully load.

## Step 2: Access n8n

1. Open your browser
2. Navigate to: `http://localhost:5678`
3. If this is your first time, you'll see the n8n welcome screen
4. Create an account or skip (for local development)

## Step 3: Import the Workflow

### Method 1: Via UI (Recommended)
1. In n8n, click on "Workflows" in the left sidebar
2. Click the "+" button to create a new workflow
3. Click on the "..." menu (three dots) in the top right
4. Select "Import from File"
5. Navigate to: `C:\Users\Albert\Documents\Wyni Technology\composio-n8n-mvp\n8n-workflows\vip-order-workflow.json`
6. Click "Open"
7. The workflow will be imported with all nodes visible

### Method 2: Copy-Paste
1. Open the file `n8n-workflows/vip-order-workflow.json` in a text editor
2. Copy all the content (Ctrl+A, Ctrl+C)
3. In n8n, click "..." menu → "Import from Clipboard"
4. Paste the content (Ctrl+V)
5. Click "Import"

## Step 4: Configure the Workflow

After importing, you'll see the workflow with these nodes:

1. **Composio Webhook Trigger** - Entry point for orders
2. **Workflow Configuration** - Where you'll set your API endpoints
3. **Parse Order Data** - Extracts order information
4. **Check Inventory** - Queries warehouses
5. **Calculate Tax** - Tax computation
6. **Generate PDF** - Invoice creation
7. **Update CRM/ERP** - System updates
8. **Send Notification** - Customer email

### Important: Update API Endpoints

Click on the "Workflow Configuration" node and update these placeholders with your real API endpoints:

- `warehouse_a_api`: Your Warehouse A API endpoint
- `warehouse_b_api`: Your Warehouse B API endpoint
- `tax_api`: Tax calculation API
- `pdf_api`: PDF generation API
- `crm_api`: CRM system API
- `erp_api`: ERP system API
- `notification_api`: Email/notification API

## Step 5: Get the Webhook URL

1. Click on the "Composio Webhook Trigger" node
2. Copy the "Test URL" or "Production URL"
3. This URL will be something like: `http://localhost:5678/webhook/vip-order`
4. Save this URL - you'll need it for the backend configuration

## Step 6: Activate the Workflow

1. Click the toggle switch in the top right to activate the workflow
2. The switch should turn green/blue when active
3. Now the workflow is ready to receive orders!

## Step 7: Test the Workflow

You can test the workflow directly in n8n:

1. Click on the "Composio Webhook Trigger" node
2. Click "Listen for Test Event"
3. Use the frontend dashboard to process an order
4. Watch the execution flow through all nodes
5. Check for any errors in red nodes

## Troubleshooting

### n8n won't start
- Check if port 5678 is already in use: `netstat -ano | findstr :5678`
- Kill the process if needed: `taskkill /PID <PID> /F`

### Workflow import fails
- Make sure the JSON file is valid
- Try Method 2 (copy-paste) if Method 1 fails

### Nodes show errors
- Each HTTP Request node needs real API endpoints
- For testing, you can use mock APIs or create simple endpoints
- Configure credentials if your APIs require authentication

## Next Steps

After setting up n8n, you need to:
1. Update the backend with your n8n webhook URL
2. Add your Composio API key
3. Remove demo mode from the application

See `CONFIGURATION_GUIDE.md` for details on configuring the backend.

