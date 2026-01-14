import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './DashboardPage.css';
import api from '../services'; // Auto-loads correct API based on mode

function DashboardPage() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [inventory, setInventory] = useState(null);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [showOrderForm, setShowOrderForm] = useState(false);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const [ordersRes, inventoryRes, statsRes] = await Promise.all([
        api.getAllOrders(),
        api.getInventory(),
        api.getWorkflowStats()
      ]);

      setOrders(ordersRes.data.orders || []);
      setInventory(inventoryRes.data.warehouses);
      setStats(statsRes.data.stats);
      setLoading(false);
    } catch (error) {
      console.error('Error loading dashboard:', error);
      setLoading(false);
    }
  };

  const handleProcessOrder = async (e) => {
    e.preventDefault();
    setProcessing(true);

    const formData = new FormData(e.target);
    const orderData = {
      customerId: formData.get('customerId'),
      customerEmail: formData.get('customerEmail'),
      isVIP: true,
      items: [
        {
          sku: formData.get('sku'),
          name: formData.get('productName'),
          quantity: parseInt(formData.get('quantity')),
          price: parseFloat(formData.get('price'))
        }
      ],
      shippingAddress: {
        street: formData.get('street'),
        city: formData.get('city'),
        state: formData.get('state'),
        zip: formData.get('zip')
      },
      totalAmount: parseFloat(formData.get('price')) * parseInt(formData.get('quantity'))
    };

    try {
      await api.processOrder(orderData);
      setShowOrderForm(false);
      setTimeout(() => {
        loadDashboardData();
      }, 2000);
    } catch (error) {
      console.error('Error processing order:', error);
    } finally {
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="dashboard-page">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="dashboard-page">
      {/* Header */}
      <header className="dashboard-header">
        <div className="container">
          <div className="header-content">
            <div>
              <h1>Dashboard</h1>
              <p>Real-time order processing & system monitoring</p>
            </div>
            <div className="header-actions">
              <button onClick={() => navigate('/')} className="btn btn-secondary">
                Home
              </button>
              <button onClick={() => navigate('/workflow')} className="btn btn-secondary">
                Workflow
              </button>
              <button onClick={() => setShowOrderForm(true)} className="btn btn-primary">
                Process New Order
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Stats Cards */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-card card">
              <div className="stat-icon">📊</div>
              <div className="stat-content">
                <h3>{stats?.totalOrders || 0}</h3>
                <p>Total Orders</p>
              </div>
            </div>
            <div className="stat-card card">
              <div className="stat-icon">✅</div>
              <div className="stat-content">
                <h3>{stats?.successRate || 0}%</h3>
                <p>Success Rate</p>
              </div>
            </div>
            <div className="stat-card card">
              <div className="stat-icon">⏱️</div>
              <div className="stat-content">
                <h3>{stats?.averageProcessingTime || 0}s</h3>
                <p>Avg Processing Time</p>
              </div>
            </div>
            <div className="stat-card card">
              <div className="stat-icon">💰</div>
              <div className="stat-content">
                <h3>${(stats?.totalRevenue || 0).toLocaleString()}</h3>
                <p>Total Revenue</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Inventory Section */}
      <section className="inventory-section">
        <div className="container">
          <h2>Warehouse Inventory</h2>
          <div className="inventory-grid">
            {inventory && Object.entries(inventory).map(([key, warehouse]) => (
              <div key={key} className="inventory-card card">
                <h3>{warehouse.name}</h3>
                <p className="location">📍 {warehouse.location}</p>
                <div className="inventory-items">
                  {warehouse.items.map((item, idx) => (
                    <div key={idx} className="inventory-item">
                      <span className="item-name">{item.name}</span>
                      <span className="item-stock">
                        <span className={`badge ${item.stock > 100 ? 'badge-success' : item.stock > 50 ? 'badge-warning' : 'badge-error'}`}>
                          {item.stock} units
                        </span>
                      </span>
                    </div>
                  ))}
                </div>
                <div className="warehouse-meta">
                  <p>⏱️ Shipping: {warehouse.averageShippingTime} days</p>
                  <p>💵 Cost: ${warehouse.shippingCost}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Orders Section */}
      <section className="orders-section">
        <div className="container">
          <h2>Recent Orders</h2>
          <div className="orders-table-container">
            {orders.length > 0 ? (
              <table className="orders-table">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Timestamp</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.orderId}>
                      <td><code>{order.orderId.substring(0, 8)}</code></td>
                      <td>{order.customerId}</td>
                      <td>${order.totalAmount?.toFixed(2)}</td>
                      <td>
                        <span className={`badge badge-${order.status === 'completed' ? 'success' : order.status === 'processing' ? 'warning' : 'error'}`}>
                          {order.status}
                        </span>
                      </td>
                      <td>{new Date(order.timestamp).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="empty-state">
                <p>No orders yet. Process your first order!</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Order Form Modal */}
      {showOrderForm && (
        <div className="modal-overlay" onClick={() => setShowOrderForm(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Process VIP Order</h2>
            <form onSubmit={handleProcessOrder}>
              <div className="form-group">
                <label>Customer ID</label>
                <input type="text" name="customerId" defaultValue="CUST-001" required />
              </div>
              <div className="form-group">
                <label>Customer Email</label>
                <input type="email" name="customerEmail" defaultValue="vip@example.com" required />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Product SKU</label>
                  <input type="text" name="sku" defaultValue="PROD-001" required />
                </div>
                <div className="form-group">
                  <label>Product Name</label>
                  <input type="text" name="productName" defaultValue="Premium Widget" required />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Quantity</label>
                  <input type="number" name="quantity" defaultValue="2" min="1" required />
                </div>
                <div className="form-group">
                  <label>Price</label>
                  <input type="number" name="price" defaultValue="99.99" step="0.01" min="0" required />
                </div>
              </div>
              <div className="form-group">
                <label>Street Address</label>
                <input type="text" name="street" defaultValue="123 Main St" required />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>City</label>
                  <input type="text" name="city" defaultValue="New York" required />
                </div>
                <div className="form-group">
                  <label>State</label>
                  <input type="text" name="state" defaultValue="NY" required />
                </div>
                <div className="form-group">
                  <label>ZIP</label>
                  <input type="text" name="zip" defaultValue="10001" required />
                </div>
              </div>
              <div className="form-actions">
                <button type="button" onClick={() => setShowOrderForm(false)} className="btn btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary" disabled={processing}>
                  {processing ? 'Processing...' : 'Process Order'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default DashboardPage;

