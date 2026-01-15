# 🔍 How to Find "Workflow Configuration" Node in n8n

## 🚨 FIRST: Login to n8n

You need to sign in to n8n first. Here are your options:

### **Option A: Use Test Credentials (If You Haven't Set Up Yet)**

1. Open: **http://localhost:5678**
2. Try these test credentials:
   - Email: `test@test.com`
   - Password: `test1234`

If that doesn't work, try creating a new account (see Option B).

### **Option B: Create New Local Account**

Since n8n is on your computer, you might need to create a local account:

1. Open: **http://localhost:5678**
2. Look for "Create account" or "Sign up" link
3. If you don't see it, try:
   - **Stopping n8n** (see instructions below)
   - **Deleting n8n data** (see instructions below)
   - **Restarting n8n**

---

## 🔄 Option C: Reset n8n and Start Fresh (RECOMMENDED)

This will give you a clean n8n without authentication.

### **Step 1: Stop n8n**

Open PowerShell and run:

```powershell
# Stop all n8n processes
Get-Process | Where-Object {$_.ProcessName -like "*node*"} | Stop-Process -Force
```

### **Step 2: Find and Delete n8n Data Folder**

n8n stores user data in your home directory. Delete it:

```powershell
# Remove n8n user data (this resets everything)
Remove-Item "$env:USERPROFILE\.n8n" -Recurse -Force -ErrorAction SilentlyContinue
```

### **Step 3: Start n8n Without Authentication**

```powershell
cd "C:\Users\Albert\Documents\Wyni Technology\composio-n8n-mvp"
$env:N8N_USER_MANAGEMENT_DISABLED="true"
n8n
```

### **Step 4: Open n8n**

Wait 30 seconds, then open: **http://localhost:5678**

You should go **directly to the workflows page** without needing to log in!

---

## 📥 After Logging In: Import Your Workflow

### **Method 1: Drag & Drop (Easiest)**

1. **Open File Explorer**
2. Navigate to: `C:\Users\Albert\Documents\Wyni Technology\composio-n8n-mvp`
3. Find file: **`AI-Driven Business Process Orchestration with Composio and n8n Integration.json`**
4. **Drag it into your browser** (where n8n is open)
5. **Drop it** anywhere on the n8n page

### **Method 2: Import Button**

1. In n8n, click **"Add workflow"** (or **"+"** button)
2. Click the **"..."** menu (three dots in the top right corner)
3. Select **"Import from file"**
4. Browse to: `C:\Users\Albert\Documents\Wyni Technology\composio-n8n-mvp\AI-Driven Business Process Orchestration with Composio and n8n Integration.json`
5. Click **"Open"**

---

## 🎯 Finding "Workflow Configuration" Node

After importing the workflow, you'll see the workflow canvas with multiple nodes.

### **Visual Guide:**

```
[Node 1]           [Node 2]              [Node 3]          [More nodes...]
Composio     →     Workflow       →      Parse Order  →    ...
Webhook            Configuration         Data
Trigger
```

### **Step-by-Step:**

1. **Look at the workflow canvas** - you should see boxes (nodes) connected by lines
2. **"Workflow Configuration"** is the **2nd box from the left**
3. It's right after **"Composio Webhook Trigger"**
4. The node **icon** looks like a **pencil** or **settings gear**

### **How to Find It:**

**Option 1: Visual Scan**
- Look for a node labeled **"Workflow Configuration"**
- It should be near the left side of your workflow

**Option 2: Zoom Out**
- Press **`Ctrl` + `-`** (minus key) to zoom out
- Or use the **zoom slider** (usually bottom right)
- You'll see the entire workflow layout

**Option 3: Node List**
- Look for a **"Nodes"** panel on the left sidebar
- You should see a list of all nodes
- Click on **"Workflow Configuration"**

**Option 4: Search**
- Press **`Ctrl` + `F`** to search
- Type: `Workflow Configuration`
- It should highlight the node

---

## ⚙️ What to Do When You Find It

### **1. Click on "Workflow Configuration" Node**

You'll see a panel open with fields.

### **2. You'll See Placeholders Like:**

```
warehouseAUrl: <__PLACEHOLDER_VALUE__Warehouse A API endpoint__>
warehouseBUrl: <__PLACEHOLDER_VALUE__Warehouse B API endpoint__>
taxApiUrl: <__PLACEHOLDER_VALUE__Tax calculation API endpoint__>
pdfGeneratorUrl: <__PLACEHOLDER_VALUE__PDF generation service endpoint__>
crmApiUrl: <__PLACEHOLDER_VALUE__CRM system API endpoint__>
erpApiUrl: <__PLACEHOLDER_VALUE__ERP system API endpoint__>
notificationUrl: <__PLACEHOLDER_VALUE__Notification service endpoint__>
vipDiscountPercent: 10
```

### **3. Replace ALL Placeholders**

For **TESTING**, use this mock API for ALL URL fields:

```
https://jsonplaceholder.typicode.com/posts
```

**So it should look like:**

```
warehouseAUrl: https://jsonplaceholder.typicode.com/posts
warehouseBUrl: https://jsonplaceholder.typicode.com/posts
taxApiUrl: https://jsonplaceholder.typicode.com/posts
pdfGeneratorUrl: https://jsonplaceholder.typicode.com/posts
crmApiUrl: https://jsonplaceholder.typicode.com/posts
erpApiUrl: https://jsonplaceholder.typicode.com/posts
notificationUrl: https://jsonplaceholder.typicode.com/posts
vipDiscountPercent: 10
```

### **4. Save**

Click the **"Save"** button (top right of the screen).

---

## ✅ Visual Checklist

- [ ] Logged into n8n (or disabled authentication)
- [ ] Can see the workflows page
- [ ] Imported the workflow JSON file
- [ ] Can see multiple nodes on the canvas
- [ ] Found "Workflow Configuration" node (2nd from left)
- [ ] Clicked on it to open the settings
- [ ] Replaced ALL placeholders with mock API URL
- [ ] Clicked "Save"
- [ ] Workflow is ready for activation

---

## 🖼️ What the Workflow Should Look Like

After importing, you should see these nodes (left to right):

1. **Composio Webhook Trigger** (purple/blue icon)
2. **Workflow Configuration** (pencil/settings icon) ← **THIS ONE!**
3. **Parse Order Data** (code icon)
4. **Check Warehouses** (branching paths)
5. **Calculate Tax**
6. **Generate PDF**
7. **Update CRM/ERP**
8. **Send Notification**
9. **Return Response**

If you see these nodes, your workflow imported correctly!

---

## 🐛 Troubleshooting

### Problem: "I don't see any nodes after importing"

**Solution:**
1. Make sure you imported the correct file
2. Try zooming out (`Ctrl` + `-`)
3. Try importing again using Method 2 (Import Button)

### Problem: "I can't find 'Workflow Configuration' node"

**Solution:**
1. Count the nodes from left to right
2. It's the 2nd one
3. Try clicking on different nodes to see their names
4. Look for a node with type "Edit Fields (Set)"

### Problem: "The node settings look different"

**Solution:**
- Make sure you clicked on the correct node
- The node should show fields like `warehouseAUrl`, `warehouseBUrl`, etc.
- If it doesn't, you clicked on the wrong node - try the next one

### Problem: "Still can't login to n8n"

**Solution:**
Follow **Option C** (Reset n8n) above. This will:
1. Delete all n8n data
2. Start fresh without authentication
3. Give you direct access to workflows

---

## 🆘 Quick Reset Commands

If all else fails, copy and paste these commands into PowerShell:

```powershell
# Stop n8n
Get-Process | Where-Object {$_.ProcessName -like "*node*"} | Stop-Process -Force

# Delete n8n data
Remove-Item "$env:USERPROFILE\.n8n" -Recurse -Force -ErrorAction SilentlyContinue

# Start n8n without authentication
cd "C:\Users\Albert\Documents\Wyni Technology\composio-n8n-mvp"
$env:N8N_USER_MANAGEMENT_DISABLED="true"
n8n
```

Wait 30 seconds, then open: **http://localhost:5678**

---

## 📞 Next Steps After Finding the Node

Once you've found and configured "Workflow Configuration":

1. ✅ **Activate the workflow** (toggle switch in top right)
2. ✅ **Get the webhook URL** from the first node
3. ✅ **Test with PowerShell** (see `EXECUTE_NOW.md`)
4. ✅ **Start the frontend** and test end-to-end

---

**Good luck! The node is there - it's the 2nd box from the left!** 🎯

