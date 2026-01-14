# Composio + n8n MVP: AI-Driven Business Process Orchestration

## 🎯 Overview

This MVP demonstrates how **Composio** and **n8n** can seamlessly integrate to handle **CRM and ERP operations simultaneously**, showcasing intelligent VIP order processing with real-time inventory management, tax calculation, and multi-system orchestration.

## ✨ Key Features

- **Dual System Integration**: Handle CRM and ERP operations in a single workflow
- **Intelligent Inventory Management**: Multi-warehouse stock checking and optimization
- **Automated Tax Calculation**: Real-time tax computation
- **Dynamic Invoice Generation**: PDF invoice creation with VIP discounts
- **Multi-System Updates**: Synchronized CRM and ERP updates
- **Real-time Notifications**: Customer notification system
- **Visual Workflow Dashboard**: Interactive demonstration interface

## 🏗️ Architecture

```
VIP Order Request → Composio Webhook → n8n Workflow
                                          ↓
                        ┌─────────────────┴─────────────────┐
                        ↓                                   ↓
                  Warehouse A                         Warehouse B
                        ↓                                   ↓
                        └─────────────┬───────────────────┘
                                     ↓
                         Best Warehouse Selection
                                     ↓
              ┌──────────────────────┼──────────────────────┐
              ↓                      ↓                      ↓
         Tax Calc              Invoice Gen             System Updates
              ↓                      ↓                      ↓
         ┌────┴────┐           ┌────┴────┐           ┌────┴────┐
         CRM       ERP      PDF Invoice    Customer Notification
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- Docker & Docker Compose (optional)
- n8n instance (local or cloud)
- Composio account

### Installation

```bash
# Navigate to project directory
cd "C:\Users\Albert\Documents\Wyni Technology\composio-n8n-mvp"

# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install

# Return to root
cd ..
```

### Running Locally

#### Option 1: With Docker
```bash
docker-compose up
```

#### Option 2: Manual Setup
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm start

# Terminal 3 - n8n (if local)
npx n8n
```

### Access Points

- **Demo Website**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **n8n Dashboard**: http://localhost:5678

## 📊 Workflow Process

1. **Trigger**: Webhook receives VIP order request
2. **Configuration**: Load API endpoints and service configurations
3. **Parse Order**: Extract order details (ID, customer, items, shipping)
4. **Inventory Check**: Query Warehouse A & B simultaneously
5. **Warehouse Selection**: Determine optimal fulfillment location
6. **Stock Validation**: Verify product availability
7. **Tax Calculation**: Compute applicable taxes
8. **Invoice Preparation**: Apply VIP discounts and generate invoice data
9. **PDF Generation**: Create professional invoice document
10. **System Updates**: Sync with CRM and ERP systems
11. **Notification**: Send confirmation to customer
12. **Response**: Return success/failure status to Composio

## 🔧 Configuration

### Backend Environment Variables

Create `backend/.env`:

```env
PORT=5000
N8N_WEBHOOK_URL=http://localhost:5678/webhook/vip-order
N8N_API_KEY=your_n8n_api_key
COMPOSIO_API_KEY=your_composio_api_key
```

### Frontend Environment Variables

Create `frontend/.env`:

```env
REACT_APP_API_URL=http://localhost:5000
```

## 📁 Project Structure

```
composio-n8n-mvp/
├── frontend/              # React demo website
│   ├── public/
│   ├── src/
│   │   ├── components/   # UI components
│   │   ├── pages/        # Page components
│   │   ├── services/     # API services
│   │   └── styles/       # CSS/styling
│   ├── package.json
│   └── README.md
├── backend/              # Node.js API server
│   ├── src/
│   │   ├── routes/       # API routes
│   │   ├── controllers/  # Business logic
│   │   ├── services/     # External services
│   │   └── utils/        # Utilities
│   ├── package.json
│   └── README.md
├── n8n-workflows/        # n8n workflow JSON files
│   ├── vip-order-workflow.json
│   └── README.md
├── docs/                 # Documentation
│   ├── SETUP.md
│   ├── WORKFLOW.md
│   └── API.md
├── docker-compose.yml    # Docker orchestration
└── README.md            # This file
```

## 🎨 Demo Features

### Landing Page
- Professional hero section
- Feature highlights
- Live workflow visualization
- Interactive demo trigger

### Dashboard
- Real-time order processing status
- Warehouse inventory display
- Order history and analytics
- System health monitoring

### Workflow Visualizer
- Interactive flow diagram
- Step-by-step execution tracking
- Real-time status updates
- Error handling display

## 🔗 Integration Points

### Composio
- Webhook triggers
- Multi-app connections
- API orchestration

### n8n
- Workflow execution
- Data transformation
- Multi-node processing
- Error handling

### CRM System
- Customer data management
- Order history tracking
- Communication logs

### ERP System
- Inventory management
- Financial records
- Supply chain operations

## 📝 API Endpoints

### Backend API

```
POST   /api/orders/process     - Process new VIP order
GET    /api/orders/:id         - Get order status
GET    /api/inventory          - Check inventory levels
GET    /api/workflow/status    - Get workflow execution status
POST   /api/webhook/n8n        - n8n webhook handler
```

## 🧪 Testing

```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test
```

## 🚢 Deployment

### To GitHub

```bash
git init
git add .
git commit -m "Initial commit: Composio + n8n MVP"
git branch -M main
git remote add origin https://github.com/yourusername/composio-n8n-mvp.git
git push -u origin main
```

### To Hostinger VPS

See `docs/DEPLOYMENT.md` for detailed deployment instructions.

## 📚 Documentation

- [Setup Guide](./docs/SETUP.md) - Detailed setup instructions
- [Workflow Documentation](./docs/WORKFLOW.md) - Complete workflow explanation
- [API Reference](./docs/API.md) - API documentation
- [Frontend README](./frontend/README.md) - Frontend details
- [Backend README](./backend/README.md) - Backend details

## 🤝 Use Case

**Demo Purpose**: Show potential clients that by utilizing Composio and n8n, businesses can:
- Handle CRM and ERP simultaneously in one workflow
- Automate complex business processes
- Integrate multiple systems seamlessly
- Reduce manual operations and errors
- Scale operations efficiently

## 📄 License

MIT License - Feel free to use this for client demonstrations

## 👥 Team

Wyni Technology - AI-Driven Business Solutions

---

**Built with ❤️ by Wyni Technology**

