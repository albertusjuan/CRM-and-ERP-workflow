# Complete Testing Guide - Frontend-Only Mode

## 🎯 What You'll Learn

This guide teaches you how to:
1. Import your n8n workflow
2. Configure the workflow
3. Test the n8n workflow directly
4. Connect frontend to n8n
5. Test the complete end-to-end flow
6. Debug common issues

## 📋 Prerequisites

- ✅ n8n installed (already starting in Terminal 7)
- ✅ Frontend code updated (done!)
- ✅ Your workflow JSON file ready

## 🚀 Step-by-Step Testing

### Step 1: Import n8n Workflow (5 minutes)

#### 1.1 Wait for n8n to finish starting

Check Terminal 7 or run:
```powershell
netstat -ano | findstr :5678
```

If you see output, n8n is running!

#### 1.2 Open n8n in Browser

```
http://localhost:5678
```

First time? You'll see n8n welcome screen:
- Click "Skip" or create a local account
- You'll land on the workflows page

#### 1.3 Import Your Workflow

**Method 1: Drag & Drop (Easiest)**
1. Open File Explorer
2. Navigate to: `C:\Users\Albert\Documents\Wyni Technology\composio-n8n-mvp`
3. Find: `AI-Driven Business Process Orchestration with Composio and n8n Integration.json`
4. Drag the file into the n8n browser window
5. Drop it anywhere on the workflows page

**Method 2: Import Button**
1. Click "Add workflow" button (or "+" icon)
2. Click the "..." menu (three dots) in top right
3. Select "Import from file"
4. Navigate to your workflow JSON file
5. Click "Open"

#### 1.4 Verify Import Success

You should see:
- A workflow with multiple nodes
- Node names like "Composio Webhook Trigger", "Parse Order Data", etc.
- Connecting lines between nodes

### Step 2: Configure the Workflow (10 minutes)

#### 2.1 Update Workflow Configuration Node

1. Click on the node named **"Workflow Configuration"** (second node)
2. You'll see placeholders for API endpoints:

```
warehouseAUrl: <__PLACEHOLDER_VALUE__Warehouse A API endpoint__>
warehouseBUrl: <__PLACEHOLDER_VALUE__Warehouse B API endpoint__>
taxApiUrl: <__PLACEHOLDER_VALUE__Tax calculation API endpoint__>
...
```

#### 2.2 Two Options for Testing

**Option A: Use Mock APIs (Recommended for Testing)**

Replace placeholders with these mock APIs:

```javascript
warehouseAUrl: https://jsonplaceholder.typicode.com/posts
warehouseBUrl: https://jsonplaceholder.typicode.com/posts
taxApiUrl: https://jsonplaceholder.typicode.com/posts
pdfGeneratorUrl: https://jsonplaceholder.typicode.com/posts
crmApiUrl: https://jsonplaceholder.typicode.com/posts
erpApiUrl: https://jsonplaceholder.typicode.com/posts
notificationUrl: https://jsonplaceholder.typicode.com/posts
```

These are public test APIs that will respond successfully.

**Option B: Use Your Real APIs**

If you have real warehouse/CRM/ERP APIs:
```
warehouseAUrl: https://your-warehouse-a-api.com/inventory
warehouseBUrl: https://your-warehouse-b-api.com/inventory
taxApiUrl: https://your-tax-api.com/calculate
... (your actual APIs)
```

3. Click **"Save"** button (top right)

#### 2.3 Get the Webhook URL

1. Click on **"Composio Webhook Trigger"** node (first node)
2. Look for the webhook URL - it should be:
   ```
   http://localhost:5678/webhook/process-vip-order
   ```
3. **COPY THIS URL** - you'll need it!

### Step 3: Activate the Workflow

1. Look at the **toggle switch** in the top right corner
2. Click it to turn the workflow **ON** (should be green/blue)
3. You'll see "Active" status

✅ Your n8n workflow is now ready!

### Step 4: Test n8n Workflow Directly (Before Frontend)

Before connecting the frontend, let's test n8n directly using Postman or curl.

#### 4.1 Using PowerShell (Easiest)

```powershell
# Test the webhook with a simple order
$body = @{
    orderId = "TEST-001"
    customerId = "CUST-123"
    customerTier = "vip"
    items = @(
        @{
            productId = "PROD-001"
            name = "Laptop"
            quantity = 2
            price = 1200
        }
    )
    shippingAddress = @{
        street = "123 Main St"
        city = "Los Angeles"
        state = "CA"
        zipCode = "90001"
        country = "USA"
    }
} | ConvertTo-Json -Depth 10

Invoke-RestMethod -Uri "http://localhost:5678/webhook/process-vip-order" -Method POST -Body $body -ContentType "application/json"
```

#### 4.2 Using Postman

1. Open Postman
2. Create new POST request
3. URL: `http://localhost:5678/webhook/process-vip-order`
4. Headers: `Content-Type: application/json`
5. Body (raw JSON):

```json
{
  "orderId": "TEST-001",
  "customerId": "CUST-123",
  "customerTier": "vip",
  "items": [
    {
      "productId": "PROD-001",
      "name": "Laptop",
      "quantity": 2,
      "price": 1200
    }
  ],
  "shippingAddress": {
    "street": "123 Main St",
    "city": "Los Angeles",
    "state": "CA",
    "zipCode": "90001",
    "country": "USA"
  }
}
```

6. Click "Send"

#### 4.3 Check Results in n8n

1. Go back to n8n browser window
2. Click on "Executions" tab (left sidebar)
3. You should see your test execution
4. Click on it to see the flow
5. Each node should show a green checkmark ✅
6. Click on nodes to see data flowing through

**Troubleshooting:**
- ❌ Red nodes = Error (click to see details)
- ⚠️ Yellow nodes = Warning
- ✅ Green nodes = Success

### Step 5: Connect Frontend to n8n

#### 5.1 Verify Frontend Configuration

Check that `frontend/.env` exists with:
```
REACT_APP_MODE=direct
REACT_APP_N8N_WEBHOOK_URL=http://localhost:5678/webhook/process-vip-order
```

#### 5.2 Restart Frontend (if needed)

If frontend is already running, restart it to load .env:

```powershell
# In the frontend terminal (press Ctrl+C first if running)
cd "C:\Users\Albert\Documents\Wyni Technology\composio-n8n-mvp\frontend"
npm start
```

#### 5.3 Check Console Logs

When frontend starts, you should see:
```
🚀 App Mode: DIRECT
📍 n8n Webhook: http://localhost:5678/webhook/process-vip-order
```

### Step 6: Test Complete Flow (Frontend → n8n)

#### 6.1 Open Frontend

```
http://localhost:3000
```

#### 6.2 Navigate to Dashboard

Click "Try Demo" or go to:
```
http://localhost:3000/dashboard
```

#### 6.3 Process a Test Order

1. Look for "Process New Order" button (or order form)
2. Fill in the form with test data:
   - Customer ID: `CUST-VIP-001`
   - Customer Name: `Test Customer`
   - Items: Add a product
   - Check "VIP Customer" checkbox
   - Fill shipping address

3. Click **"Process Order"**

#### 6.4 Watch the Magic! ✨

**In Frontend:**
- You'll see a loading spinner
- After a few seconds, you should see success message
- Order appears in the orders list

**In n8n (open in another tab):**
1. Go to "Executions" tab
2. You should see a new execution
3. Click on it to see the entire workflow execute
4. Watch data flow through all nodes:
   - ✅ Parse Order Data
   - ✅ Check Warehouses
   - ✅ Calculate Tax
   - ✅ Generate PDF
   - ✅ Update CRM/ERP
   - ✅ Send Notification
   - ✅ Return Response

**In Browser DevTools:**
1. Press F12 to open DevTools
2. Go to "Network" tab
3. You'll see the POST request to n8n webhook
4. Click on it to see request/response data

### Step 7: Advanced Testing

#### 7.1 Test Different Scenarios

**Test 1: VIP Order**
```javascript
{
  "customerTier": "vip",
  // ... other data
}
```
Should get 10% discount

**Test 2: Regular Order**
```javascript
{
  "customerTier": "standard",
  // ... other data
}
```
No discount

**Test 3: Multiple Items**
```javascript
{
  "items": [
    { "productId": "P1", "name": "Item 1", "quantity": 2, "price": 100 },
    { "productId": "P2", "name": "Item 2", "quantity": 1, "price": 50 }
  ]
}
```

**Test 4: Different Addresses**
Try different states/countries to test tax calculation

#### 7.2 Test Error Handling

**Test Out of Stock:**
(You'd need to modify workflow logic to simulate this)

**Test Invalid Data:**
```javascript
{
  // Missing required fields
  "orderId": "TEST"
  // No items, no address
}
```

Watch how n8n handles it in the "Executions" tab.

### Step 8: Monitor & Debug

#### 8.1 Monitor n8n Executions

```
http://localhost:5678
→ Click "Executions" (left sidebar)
→ See all workflow runs
→ Click any execution to debug
```

#### 8.2 Check Execution Details

For each execution:
- ✅ Green = Success
- ❌ Red = Failed
- ⏸️ Grey = Not executed

Click on any node to see:
- Input data
- Output data
- Execution time
- Error messages (if any)

#### 8.3 Frontend Debugging

Open Browser DevTools (F12):

**Console Tab:**
```javascript
// You should see:
🚀 App Mode: DIRECT
📍 n8n Webhook: http://localhost:5678/webhook/process-vip-order

// When processing order:
Processing order...
Order response: {...}
```

**Network Tab:**
- Find the POST request to n8n
- Check request payload
- Check response data
- Check status code (200 = success)

#### 8.4 Common Issues & Solutions

**Issue 1: "Cannot reach n8n"**
```
✅ Solution:
1. Check n8n is running: http://localhost:5678
2. Check workflow is activated (toggle ON)
3. Verify webhook URL in .env file
```

**Issue 2: "CORS Error"**
```
✅ Solution:
n8n needs CORS enabled for frontend access.
In n8n settings, ensure CORS is allowed for http://localhost:3000
```

**Issue 3: "Workflow not executing"**
```
✅ Solution:
1. Check workflow is activated
2. Check webhook trigger node is configured
3. Look at n8n terminal for errors
```

**Issue 4: "Red nodes in workflow"**
```
✅ Solution:
1. Click on the red node
2. Read the error message
3. Usually API endpoint issues (check URLs in Configuration node)
4. For testing, use mock APIs (jsonplaceholder.typicode.com)
```

## 🎯 Complete Test Checklist

Use this checklist to verify everything works:

- [ ] n8n is running on port 5678
- [ ] Workflow is imported successfully
- [ ] Workflow Configuration node is updated
- [ ] Webhook trigger node shows URL
- [ ] Workflow is ACTIVATED (toggle ON)
- [ ] Direct test via PowerShell/Postman works
- [ ] Execution appears in n8n Executions tab
- [ ] Frontend .env file is configured
- [ ] Frontend shows "DIRECT" mode in console
- [ ] Can access frontend at localhost:3000
- [ ] Can navigate to dashboard
- [ ] Can submit order form
- [ ] Order processes successfully
- [ ] New execution appears in n8n
- [ ] All nodes show green checkmarks
- [ ] Response returns to frontend
- [ ] Order appears in dashboard list

## 🚀 Performance Testing

Test how fast your workflow runs:

```powershell
# Time a single order
Measure-Command {
  $body = @{...} | ConvertTo-Json
  Invoke-RestMethod -Uri "http://localhost:5678/webhook/process-vip-order" -Method POST -Body $body -ContentType "application/json"
}
```

Check in n8n Executions tab for execution time.

## 📊 What Success Looks Like

**n8n Executions:**
- ✅ All nodes green
- ✅ Execution time < 5 seconds (with mock APIs)
- ✅ Response data includes order confirmation

**Frontend:**
- ✅ No console errors
- ✅ Order appears in list
- ✅ Success message displayed
- ✅ Loading indicator works

**Browser Network:**
- ✅ POST request shows 200 status
- ✅ Response contains expected data
- ✅ No CORS errors

## 🎓 Next Steps

After successful testing:

1. **Replace Mock APIs** with your real APIs
2. **Add Error Handling** in workflow
3. **Add Notifications** (email, SMS)
4. **Add Authentication** to n8n webhook
5. **Deploy to Production** (n8n Cloud or self-hosted)

## 📚 Additional Resources

- n8n Documentation: https://docs.n8n.io
- n8n Community: https://community.n8n.io
- Workflow Examples: https://n8n.io/workflows

---

**You're now ready to process orders through your n8n workflow!** 🎉

