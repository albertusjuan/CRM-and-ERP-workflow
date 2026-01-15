# 🚀 Execute Testing Guide - Follow These Steps NOW

## ✅ Current Status

- ✅ n8n is starting in Terminal 9 (wait 1-2 minutes)
- ✅ Frontend code is ready
- ✅ Configuration files created
- ✅ Your workflow JSON file is ready

---

## 📝 Step-by-Step Execution

### **STEP 1: Wait for n8n to Start** ⏳

**What to do:**
1. Wait 1-2 minutes for n8n to finish installing
2. Check if it's ready by opening: **http://localhost:5678**
3. If you see n8n interface → Continue to Step 2
4. If connection refused → Wait 30 more seconds and try again

**How to check manually:**
```powershell
netstat -ano | findstr :5678
```
If you see output → n8n is running!

---

### **STEP 2: Open n8n and Import Workflow** 📥

**2.1 Open n8n**
- Open browser: **http://localhost:5678**
- First time? Click "Skip" or create account

**2.2 Import Your Workflow**

**Option A: Drag & Drop (Easiest)**
1. Open File Explorer
2. Go to: `C:\Users\Albert\Documents\Wyni Technology\composio-n8n-mvp`
3. Find file: `AI-Driven Business Process Orchestration with Composio and n8n Integration.json`
4. **Drag it into the n8n browser window**
5. Drop anywhere on the page

**Option B: Import Button**
1. In n8n, click **"Add workflow"** (+ button)
2. Click **"..." menu** (three dots, top right)
3. Select **"Import from file"**
4. Navigate to the JSON file
5. Click **"Open"**

**✅ Success Check:**
You should see a workflow with many nodes connected by lines

---

### **STEP 3: Configure the Workflow** ⚙️

**3.1 Click on "Workflow Configuration" Node**
- It's the 2nd node from the left
- You'll see placeholders like `<__PLACEHOLDER_VALUE__...>`

**3.2 Replace ALL Placeholders**

For **TESTING**, use this mock API for ALL fields:
```
https://jsonplaceholder.typicode.com/posts
```

**Replace these fields:**
- `warehouseAUrl` → `https://jsonplaceholder.typicode.com/posts`
- `warehouseBUrl` → `https://jsonplaceholder.typicode.com/posts`
- `taxApiUrl` → `https://jsonplaceholder.typicode.com/posts`
- `pdfGeneratorUrl` → `https://jsonplaceholder.typicode.com/posts`
- `crmApiUrl` → `https://jsonplaceholder.typicode.com/posts`
- `erpApiUrl` → `https://jsonplaceholder.typicode.com/posts`
- `notificationUrl` → `https://jsonplaceholder.typicode.com/posts`

**3.3 Save**
- Click **"Save"** button (top right)

---

### **STEP 4: Activate the Workflow** 🟢

**4.1 Find the Toggle Switch**
- Look at **top right corner**
- You'll see a toggle switch (OFF/ON)

**4.2 Click to Activate**
- Click the toggle
- It should turn **green/blue**
- Status changes to **"Active"**

**✅ Success Check:**
Toggle is ON and workflow shows "Active"

---

### **STEP 5: Get Webhook URL** 🔗

**5.1 Click "Composio Webhook Trigger" Node**
- It's the **first node** (far left)

**5.2 Find the Webhook URL**
- Look for the URL in the node settings
- Should be: `http://localhost:5678/webhook/process-vip-order`

**5.3 Copy This URL**
- You'll need it for testing
- **Write it down or copy to clipboard**

---

### **STEP 6: Test n8n Directly** 🧪

Before testing with frontend, let's test n8n directly.

**Open PowerShell and run:**

```powershell
$body = @{
    orderId = "TEST-001"
    customerId = "CUST-VIP-123"
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

**✅ Expected Result:**
- You get a JSON response back
- No errors

**📊 Check n8n Executions:**
1. Go back to n8n browser window
2. Click **"Executions"** tab (left sidebar)
3. You should see your test execution
4. Click on it to see details
5. **All nodes should be GREEN ✅**

**❌ If you see RED nodes:**
- Click on the red node
- Read the error message
- Usually means API endpoint issue
- Make sure you used the mock API URLs

---

### **STEP 7: Start Frontend** 💻

**7.1 Open NEW PowerShell Terminal**

**7.2 Run:**
```powershell
cd "C:\Users\Albert\Documents\Wyni Technology\composio-n8n-mvp\frontend"
npm start
```

**7.3 Wait for Frontend to Start**
- Browser will auto-open: **http://localhost:3000**
- Or manually open: **http://localhost:3000**

**7.4 Check Console**
- Press **F12** to open DevTools
- Go to **Console** tab
- You should see:
  ```
  🚀 App Mode: DIRECT
  📍 n8n Webhook: http://localhost:5678/webhook/process-vip-order
  ```

**✅ Success Check:**
Console shows "App Mode: DIRECT"

---

### **STEP 8: Test Complete Flow** 🎯

**8.1 Navigate to Dashboard**
- Click **"Try Demo"** button
- Or go to: **http://localhost:3000/dashboard**

**8.2 Process a Test Order**

Look for the order form and fill in:
- **Customer ID**: `CUST-VIP-001`
- **Customer Name**: `Test Customer`
- **Items**: Add a product (any name, quantity, price)
- **VIP Customer**: ✅ Check this box
- **Shipping Address**: Fill in any address

**8.3 Click "Process Order"**

**8.4 Watch What Happens:**

**In Frontend:**
- Loading spinner appears
- After 2-3 seconds: Success message
- Order appears in orders list

**In n8n (keep it open in another tab):**
1. Go to **"Executions"** tab
2. You'll see a **NEW execution** appear
3. Click on it
4. Watch the workflow execute through all nodes
5. All nodes should be **GREEN ✅**

**In Browser DevTools (F12):**
1. Go to **"Network"** tab
2. You'll see POST request to `localhost:5678/webhook...`
3. Click on it
4. Check **Response** tab - you'll see the order data

---

## ✅ Success Checklist

Mark these off as you complete them:

- [ ] n8n is running at http://localhost:5678
- [ ] Workflow is imported successfully
- [ ] Workflow Configuration node has mock APIs
- [ ] Workflow is ACTIVATED (toggle ON)
- [ ] Webhook URL copied
- [ ] Direct test via PowerShell works
- [ ] Execution appears in n8n with green nodes
- [ ] Frontend is running at http://localhost:3000
- [ ] Console shows "App Mode: DIRECT"
- [ ] Can process order from dashboard
- [ ] Order execution appears in n8n
- [ ] All nodes are green in execution
- [ ] Success message shows in frontend

---

## 🐛 Troubleshooting

### Problem: n8n won't start
**Solution:**
```powershell
# Check if port is in use
netstat -ano | findstr :5678

# If something is using it, kill it
taskkill /PID <PID_NUMBER> /F

# Try starting again
npx --yes n8n
```

### Problem: "Cannot reach n8n" from frontend
**Solution:**
1. Check n8n is running: http://localhost:5678
2. Check workflow is ACTIVATED (toggle ON)
3. Check `.env` file in `frontend/` folder has correct URL

### Problem: Red nodes in n8n execution
**Solution:**
1. Click on the red node
2. Read error message
3. Most common: Wrong API URL in Configuration node
4. Make sure you used: `https://jsonplaceholder.typicode.com/posts`

### Problem: CORS error
**Solution:**
n8n should allow CORS by default for localhost.
If you see CORS errors, restart n8n.

---

## 🎯 Quick Commands Reference

**Check if n8n is running:**
```powershell
netstat -ano | findstr :5678
```

**Start n8n:**
```powershell
cd "C:\Users\Albert\Documents\Wyni Technology\composio-n8n-mvp"
npx --yes n8n
```

**Start frontend:**
```powershell
cd "C:\Users\Albert\Documents\Wyni Technology\composio-n8n-mvp\frontend"
npm start
```

**Test n8n directly:**
```powershell
# Use the PowerShell command from Step 6
```

---

## 📚 What's Next?

After successful testing:

1. **Replace mock APIs** with your real APIs
2. **Customize workflow** for your business needs
3. **Add more features** to the workflow
4. **Deploy to production**

---

## 🆘 Need Help?

Check these files:
- **Full Testing Guide**: `docs/TESTING_GUIDE.md`
- **Architecture Info**: `docs/ARCHITECTURE_DECISION.md`
- **Quick Start**: `QUICK_START_FRONTEND_ONLY.md`

---

**🚀 START NOW: Open http://localhost:5678 and follow Step 2!**

