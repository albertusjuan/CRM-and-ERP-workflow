# Setup Guide - Composio + n8n MVP

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 18 or higher
- **npm** or **yarn**
- **Git**
- **Docker & Docker Compose** (optional, for containerized setup)

## Quick Start

### Option 1: Docker Setup (Recommended)

This is the fastest way to get everything running:

```bash
# Navigate to project directory
cd "C:\Users\Albert\Documents\Wyni Technology\composio-n8n-mvp"

# Start all services
docker-compose up -d

# Check status
docker-compose ps
```

Access points:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- n8n: http://localhost:5678

### Option 2: Manual Setup

If you prefer running services individually:

#### 1. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Edit .env file with your settings
notepad .env

# Start backend
npm run dev
```

#### 2. Frontend Setup

Open a new terminal:

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Edit .env if needed
notepad .env

# Start frontend
npm start
```

#### 3. n8n Setup

Open another terminal:

```bash
# Start n8n (with npx)
npx n8n

# Or if installed globally
npm install -g n8n
n8n start
```

#### 4. Import n8n Workflow

1. Open n8n at http://localhost:5678
2. Create a new workflow
3. Click menu (⋮) → "Import from File"
4. Select `n8n-workflows/vip-order-workflow.json`
5. Activate the workflow

## Configuration

### Backend Environment Variables

Edit `backend/.env`:

```env
# Server
PORT=5000
NODE_ENV=development

# n8n Configuration
N8N_WEBHOOK_URL=http://localhost:5678/webhook/vip-order
N8N_API_KEY=your_api_key_here
N8N_BASE_URL=http://localhost:5678

# Composio Configuration
COMPOSIO_API_KEY=your_composio_api_key_here
COMPOSIO_BASE_URL=https://api.composio.dev

# CORS
CORS_ORIGIN=http://localhost:3000

# Demo Mode (true = no external API calls)
DEMO_MODE=true
```

### Frontend Environment Variables

Edit `frontend/.env`:

```env
REACT_APP_API_URL=http://localhost:5000
REACT_APP_COMPANY_NAME=Wyni Technology
```

## Demo Mode

For testing and demonstrations, set `DEMO_MODE=true` in the backend `.env` file. This enables:

- Mock responses without external API calls
- Simulated processing delays
- Fake order results
- No Composio or n8n integration required

Perfect for client demos and development!

## Verification

After setup, verify everything is working:

### 1. Backend Health Check

```bash
curl http://localhost:5000/health
```

Expected response:
```json
{
  "status": "healthy",
  "timestamp": "2026-01-14T...",
  "service": "Composio + n8n Backend API"
}
```

### 2. Frontend Access

Open browser: http://localhost:3000

You should see the landing page.

### 3. n8n Workflow

1. Open http://localhost:5678
2. Check that the VIP Order Processing workflow is active
3. Test the webhook endpoint

### 4. Test Order Processing

Using the dashboard:
1. Go to http://localhost:3000/dashboard
2. Click "Process New Order"
3. Fill in the form (or use defaults)
4. Submit
5. Check order appears in the table

Using curl:
```bash
curl -X POST http://localhost:5000/api/orders/process \
  -H "Content-Type: application/json" \
  -d '{
    "customerId": "CUST-001",
    "customerEmail": "test@example.com",
    "isVIP": true,
    "items": [{"sku": "PROD-001", "quantity": 2, "price": 99.99}],
    "shippingAddress": {
      "street": "123 Main St",
      "city": "New York",
      "state": "NY",
      "zip": "10001"
    },
    "totalAmount": 199.98
  }'
```

## Troubleshooting

### Port Already in Use

If you get "port already in use" errors:

**Frontend (Port 3000):**
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Edit frontend/.env to use different port
PORT=3001
```

**Backend (Port 5000):**
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Or edit backend/.env
PORT=5001
```

**n8n (Port 5678):**
```bash
# Windows
netstat -ano | findstr :5678
taskkill /PID <PID> /F

# Or start n8n on different port
n8n start --port 5679
```

### Dependencies Issues

```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Docker Issues

```bash
# Stop all containers
docker-compose down

# Remove volumes
docker-compose down -v

# Rebuild
docker-compose build --no-cache

# Start fresh
docker-compose up -d
```

### n8n Workflow Not Working

1. Check workflow is activated (toggle in n8n UI)
2. Verify webhook URL matches backend configuration
3. Check n8n logs for errors
4. Test webhook directly with curl

### CORS Errors

Ensure backend `CORS_ORIGIN` matches frontend URL:
```env
# backend/.env
CORS_ORIGIN=http://localhost:3000
```

## Next Steps

Once everything is running:

1. **Explore the Demo**: Navigate through Landing, Dashboard, and Workflow pages
2. **Process Orders**: Try creating test orders
3. **Customize Workflow**: Modify the n8n workflow to fit your needs
4. **Integration**: Replace mock APIs with real services

## Getting Help

If you encounter issues:

1. Check logs:
   - Backend: Terminal where backend is running
   - Frontend: Browser console (F12)
   - n8n: n8n UI → Executions tab
   - Docker: `docker-compose logs`

2. Verify configuration:
   - All .env files are set up
   - Ports are not conflicting
   - Services can communicate

3. Test individually:
   - Backend health endpoint
   - Frontend loads
   - n8n is accessible
   - Then test integration

## Support

For questions or issues specific to this MVP, contact Wyni Technology team.

