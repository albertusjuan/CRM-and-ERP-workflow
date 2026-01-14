import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './WorkflowPage.css';
import api from '../services/api';

function WorkflowPage() {
  const navigate = useNavigate();
  const [workflowStatus, setWorkflowStatus] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadWorkflowStatus();
  }, []);

  const loadWorkflowStatus = async () => {
    try {
      const response = await api.getWorkflowStatus();
      setWorkflowStatus(response.data.status);
      setLoading(false);
    } catch (error) {
      console.error('Error loading workflow:', error);
      setLoading(false);
    }
  };

  const workflowSteps = [
    {
      id: 1,
      title: 'Webhook Trigger',
      description: 'Composio webhook receives VIP order request',
      icon: '🔔',
      color: '#667eea'
    },
    {
      id: 2,
      title: 'Parse Order',
      description: 'Extract and validate order data',
      icon: '📝',
      color: '#f59e0b'
    },
    {
      id: 3,
      title: 'Check Warehouses',
      description: 'Query Warehouse A & B inventory simultaneously',
      icon: '📦',
      color: '#10b981'
    },
    {
      id: 4,
      title: 'Select Warehouse',
      description: 'Determine optimal fulfillment location',
      icon: '🎯',
      color: '#3b82f6'
    },
    {
      id: 5,
      title: 'Calculate Tax',
      description: 'Compute applicable taxes',
      icon: '💰',
      color: '#8b5cf6'
    },
    {
      id: 6,
      title: 'Generate Invoice',
      description: 'Create PDF with VIP discount',
      icon: '📄',
      color: '#ec4899'
    },
    {
      id: 7,
      title: 'Update CRM',
      description: 'Sync customer relationship data',
      icon: '👥',
      color: '#06b6d4'
    },
    {
      id: 8,
      title: 'Update ERP',
      description: 'Sync enterprise resource planning',
      icon: '🏢',
      color: '#f97316'
    },
    {
      id: 9,
      title: 'Notify Customer',
      description: 'Send confirmation email',
      icon: '✉️',
      color: '#14b8a6'
    },
    {
      id: 10,
      title: 'Return Response',
      description: 'Send result back to Composio',
      icon: '✅',
      color: '#22c55e'
    }
  ];

  if (loading) {
    return (
      <div className="workflow-page">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="workflow-page">
      {/* Header */}
      <header className="workflow-header">
        <div className="container">
          <div className="header-content">
            <div>
              <h1>Workflow Visualization</h1>
              <p>VIP Order Processing - End-to-End Automation</p>
            </div>
            <div className="header-actions">
              <button onClick={() => navigate('/')} className="btn btn-secondary">
                Home
              </button>
              <button onClick={() => navigate('/dashboard')} className="btn btn-primary">
                Dashboard
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Workflow Status */}
      <section className="workflow-status-section">
        <div className="container">
          <div className="status-card card">
            <div className="status-header">
              <h2>{workflowStatus?.name || 'VIP Order Processing'}</h2>
              <span className={`badge ${workflowStatus?.active ? 'badge-success' : 'badge-error'}`}>
                {workflowStatus?.active ? 'Active' : 'Inactive'}
              </span>
            </div>
            <div className="status-grid">
              <div className="status-item">
                <span className="status-label">Total Executions</span>
                <span className="status-value">{workflowStatus?.executions?.total || 0}</span>
              </div>
              <div className="status-item">
                <span className="status-label">Successful</span>
                <span className="status-value success">{workflowStatus?.executions?.successful || 0}</span>
              </div>
              <div className="status-item">
                <span className="status-label">Failed</span>
                <span className="status-value error">{workflowStatus?.executions?.failed || 0}</span>
              </div>
              <div className="status-item">
                <span className="status-label">Avg Time</span>
                <span className="status-value">{workflowStatus?.averageExecutionTime || 'N/A'}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Workflow Steps */}
      <section className="workflow-steps-section">
        <div className="container">
          <h2 className="section-title">Workflow Steps</h2>
          <div className="workflow-flow">
            {workflowSteps.map((step, index) => (
              <React.Fragment key={step.id}>
                <div className="flow-step card" style={{ borderLeft: `4px solid ${step.color}` }}>
                  <div className="step-header">
                    <span className="step-icon">{step.icon}</span>
                    <div className="step-info">
                      <h3>{step.title}</h3>
                      <p>{step.description}</p>
                    </div>
                  </div>
                  <div className="step-number">Step {step.id}</div>
                </div>
                {index < workflowSteps.length - 1 && (
                  <div className="flow-arrow">↓</div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* Integration Points */}
      <section className="integrations-section">
        <div className="container">
          <h2 className="section-title">System Integrations</h2>
          <div className="integrations-grid">
            <div className="integration-card card">
              <div className="integration-icon">🔗</div>
              <h3>Composio</h3>
              <p>Webhook triggers and API orchestration</p>
              <span className="badge badge-success">Connected</span>
            </div>
            <div className="integration-card card">
              <div className="integration-icon">⚙️</div>
              <h3>n8n</h3>
              <p>Workflow execution engine</p>
              <span className="badge badge-success">Active</span>
            </div>
            <div className="integration-card card">
              <div className="integration-icon">👥</div>
              <h3>CRM System</h3>
              <p>Customer relationship management</p>
              <span className="badge badge-success">Synced</span>
            </div>
            <div className="integration-card card">
              <div className="integration-icon">🏢</div>
              <h3>ERP System</h3>
              <p>Enterprise resource planning</p>
              <span className="badge badge-success">Synced</span>
            </div>
            <div className="integration-card card">
              <div className="integration-icon">📦</div>
              <h3>Warehouse A</h3>
              <p>East Coast inventory</p>
              <span className="badge badge-success">Connected</span>
            </div>
            <div className="integration-card card">
              <div className="integration-icon">📦</div>
              <h3>Warehouse B</h3>
              <p>West Coast inventory</p>
              <span className="badge badge-success">Connected</span>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="benefits-section">
        <div className="container">
          <h2 className="section-title">Workflow Benefits</h2>
          <div className="benefits-grid">
            <div className="benefit-card">
              <div className="benefit-icon">⚡</div>
              <h3>Automated Processing</h3>
              <p>Eliminate manual order entry and reduce processing time from hours to seconds</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">🎯</div>
              <h3>Intelligent Routing</h3>
              <p>Automatically select the best warehouse based on availability, cost, and shipping time</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">🔄</div>
              <h3>Real-time Sync</h3>
              <p>Keep CRM and ERP systems updated simultaneously without manual intervention</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">💎</div>
              <h3>VIP Experience</h3>
              <p>Provide premium service with automatic discounts and priority processing</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default WorkflowPage;

