# Quick Start Guide

## ✅ What Was Done

### 1. Removed ALL Hardcoded Data
- ❌ No more demo mode
- ❌ No more mock responses
- ❌ No more fake inventory data
- ✅ System now requires real configuration

### 2. Created Configuration System
- ✅ New Settings page at `/settings`
- ✅ API key management for n8n and Composio
- ✅ Connection testing before saving
- ✅ Clear error messages when not configured

### 3. Documentation
- ✅ `N8N_SETUP_GUIDE.md` - How to set up n8n
- ✅ `CONFIGURATION_GUIDE.md` - Detailed configuration instructions
- ✅ This Quick Start guide

## 🚀 How to Get Started (3 Simple Steps)

### Step 1: Start n8n (Terminal 7 is already running it)

n8n should be starting in Terminal 7. Wait 1-2 minutes, then:

1. Open browser: `http://localhost:5678`
2. Create account or skip (for local dev)

### Step 2: Import Workflow

1. In n8n, click "Workflows" → "+" (new workflow)
2. Click "..." menu → "Import from File"
3. Navigate to: `C:\Users\Albert\Documents\Wyni Technology\composio-n8n-mvp\n8n-workflows\vip-order-workflow.json`
4. Click "Import"
5. Click the toggle to **Activate** the workflow
6. Click on "Composio Webhook Trigger" node
7. **Copy the webhook URL** (something like: `http://localhost:5678/webhook/vip-order`)

### Step 3: Configure the System

1. Open frontend: `http://localhost:3000`
2. Go to **Settings** (add a button or navigate to `/settings`)
3. Fill in the form:

**n8n Configuration:**
- Webhook URL: (paste the URL from Step 2)
- Base URL: `http://localhost:5678`
- API Key: (leave empty for local dev)

**Composio Configuration:**
- API Key: Get from [https://app.composio.dev](https://app.composio.dev)
- Base URL: `https://api.composio.dev`

4. Click **"Test Connection"** for both services
5. Click **"Save Configuration"**

## ✅ Done! Now You Can Process Orders

After configuration:
1. Go to **Dashboard**: `http://localhost:3000/dashboard`
2. Click **"Process New Order"**
3. Fill in the form
4. Click **"Process Order"**
5. Watch it flow through your n8n workflow!

## 📊 What Happens Now

When you process an order:

1. ✅ Frontend sends order to backend
2. ✅ Backend checks if system is configured
3. ✅ If configured → sends to n8n webhook
4. ✅ n8n workflow executes all steps
5. ✅ Result returns to frontend
6. ✅ Order appears in dashboard

If NOT configured:
- ❌ Error: "System not configured"
- 💡 Message: "Please configure n8n and Composio in settings"

## 🔧 Next Steps (After Basic Setup)

### Update Workflow API Endpoints

The workflow has placeholder APIs that you need to replace:

1. Open workflow in n8n
2. Click "Workflow Configuration" node
3. Update these with your real APIs:
   - `warehouse_a_api` → Your Warehouse A API
   - `warehouse_b_api` → Your Warehouse B API
   - `tax_api` → Tax calculation API
   - `pdf_api` → PDF generation API
   - `crm_api` → CRM system API
   - `erp_api` → ERP system API
   - `notification_api` → Email service API

For now, you can use mock APIs or leave them as is for testing.

## 📝 Important Files

- `docs/N8N_SETUP_GUIDE.md` - Detailed n8n setup
- `docs/CONFIGURATION_GUIDE.md` - Complete configuration guide
- `n8n-workflows/vip-order-workflow.json` - The workflow to import
- Frontend Settings: `http://localhost:3000/settings`

## 🐛 Troubleshooting

### "System not configured" error
→ Go to `/settings` and configure your API keys

### n8n connection fails
→ Make sure n8n is running at `http://localhost:5678`
→ Make sure workflow is **activated** (toggle switch)

### Orders not processing
→ Check n8n logs (Terminal 7)
→ Check backend logs (Terminal 6)
→ Look at n8n workflow execution history

## 🎯 Summary

**Before:** Everything was hardcoded and fake
**Now:** System requires real configuration and uses real n8n workflows

**What you need:**
1. ✅ n8n running (Terminal 7)
2. ✅ Workflow imported and activated
3. ✅ Webhook URL copied
4. ✅ Composio API key from app.composio.dev
5. ✅ Configuration saved in Settings page

**Then:** Process real orders through your n8n workflow! 🚀

---

**Need Help?** Check:
- `docs/N8N_SETUP_GUIDE.md` for n8n details
- `docs/CONFIGURATION_GUIDE.md` for advanced configuration
- n8n UI for workflow execution logs

