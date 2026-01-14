# Frontend - Composio + n8n MVP Demo

## Overview

Modern React-based demo website showcasing the Composio + n8n integration for VIP order processing.

## Features

- **Landing Page**: Professional hero section with feature highlights
- **Dashboard**: Real-time order processing and monitoring
- **Workflow Visualization**: Interactive step-by-step process display
- **Order Management**: Process and track VIP orders
- **Inventory Display**: Multi-warehouse stock levels
- **Responsive Design**: Works on all devices

## Technology Stack

- React 18
- React Router v6
- Axios for API calls
- Modern CSS with gradients and animations
- React Icons

## Setup

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Start development server
npm start
```

## Environment Variables

```env
REACT_APP_API_URL=http://localhost:5000
REACT_APP_COMPANY_NAME=Wyni Technology
```

## Pages

### Landing Page (`/`)
- Hero section with call-to-action
- Feature cards
- Workflow overview
- Benefits section

### Dashboard (`/dashboard`)
- Statistics cards
- Warehouse inventory display
- Order history table
- Process new order form

### Workflow Page (`/workflow`)
- Step-by-step visualization
- System integration status
- Workflow benefits

## Components Structure

```
src/
├── pages/
│   ├── LandingPage.js      # Home page
│   ├── DashboardPage.js    # Order dashboard
│   └── WorkflowPage.js     # Workflow visualization
├── services/
│   └── api.js              # API client
├── App.js                  # Main app component
└── index.js                # Entry point
```

## API Integration

The frontend communicates with the backend API:

- `POST /api/orders/process` - Process orders
- `GET /api/orders` - Get all orders
- `GET /api/inventory` - Get inventory
- `GET /api/workflow/status` - Get workflow status
- `GET /api/workflow/stats` - Get statistics

## Building for Production

```bash
# Create optimized build
npm run build

# The build folder is ready to deploy
```

## Styling

- CSS Variables for consistent theming
- Gradient backgrounds
- Smooth transitions and animations
- Card-based layouts
- Responsive grid systems

## Demo Mode

The frontend works seamlessly with the backend's demo mode, allowing full functionality testing without live integrations.

