# Quick Start - Frontend-Only Mode (No Backend)

## ⚡ 3-Step Setup

### Step 1: Start n8n (1 minute)

```powershell
cd "C:\Users\Albert\Documents\Wyni Technology\composio-n8n-mvp"
npx n8n
```

Wait for n8n to start, then open: http://localhost:5678

### Step 2: Import Workflow (2 minutes)

1. In n8n, create new workflow
2. Import file: `AI-Driven Business Process Orchestration with Composio and n8n Integration.json`
3. Click "Workflow Configuration" node
4. Replace placeholders with mock APIs:
   ```
   All URLs → https://jsonplaceholder.typicode.com/posts
   ```
5. Save workflow
6. **Activate** the workflow (toggle ON)
7. Copy webhook URL: `http://localhost:5678/webhook/process-vip-order`

### Step 3: Start Frontend (1 minute)

```powershell
cd frontend
npm start
```

Frontend opens at: http://localhost:3000

## ✅ Test It!

1. Go to Dashboard: http://localhost:3000/dashboard
2. Click "Process New Order"
3. Fill in the form
4. Click "Process Order"
5. Watch n8n execute the workflow!

## 🎯 What's Happening

```
Frontend (React) → n8n Webhook → n8n Workflow → External APIs → Response
```

**No backend needed!**

## 🐛 Troubleshooting

**Frontend can't reach n8n?**
- Check n8n is running: http://localhost:5678
- Check workflow is activated (toggle ON)
- Check `.env` file in `frontend/` folder

**Workflow errors?**
- Go to n8n → Executions tab
- Click on failed execution
- Check which node failed (red)
- Use mock APIs for testing (jsonplaceholder.typicode.com)

## 📚 Full Guides

- **Testing**: See `docs/TESTING_GUIDE.md`
- **Architecture**: See `docs/ARCHITECTURE_DECISION.md`
- **Frontend-Only Setup**: See `docs/FRONTEND_ONLY_SETUP.md`

---

**You're now running frontend-only mode!** 🚀

## 🔄 Switch Back to Backend Mode (Optional)

If you want to use the backend:

1. Edit `frontend/.env`:
   ```
   REACT_APP_MODE=backend
   REACT_APP_API_URL=http://localhost:5000
   ```

2. Start backend:
   ```powershell
   cd backend
   npm run dev
   ```

3. Restart frontend

That's it!

