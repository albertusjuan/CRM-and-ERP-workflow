import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

function LandingPage() {
  const navigate = useNavigate();

  const features = [
    {
      title: 'Dual System Integration',
      description: 'Handle CRM and ERP operations simultaneously in one workflow',
      icon: '🔗'
    },
    {
      title: 'Smart Inventory Management',
      description: 'Multi-warehouse stock checking with intelligent optimization',
      icon: '📦'
    },
    {
      title: 'Automated Processing',
      description: 'Tax calculation, invoice generation, and system updates',
      icon: '⚡'
    },
    {
      title: 'Real-time Orchestration',
      description: 'Seamless integration across multiple business systems',
      icon: '🎯'
    }
  ];

  const workflow = [
    { step: 1, title: 'Order Received', desc: 'VIP order triggers workflow' },
    { step: 2, title: 'Inventory Check', desc: 'Multi-warehouse availability' },
    { step: 3, title: 'Best Warehouse', desc: 'Optimal fulfillment selection' },
    { step: 4, title: 'Tax & Invoice', desc: 'Automated calculation & PDF' },
    { step: 5, title: 'System Updates', desc: 'CRM & ERP synchronization' },
    { step: 6, title: 'Notification', desc: 'Customer confirmation' }
  ];

  return (
    <div className="landing-page">
      {/* Header */}
      <header className="header">
        <div className="container header-content">
          <div className="logo">
            <h2>Wyni Technology</h2>
          </div>
          <nav className="nav">
            <button onClick={() => navigate('/dashboard')} className="nav-link">
              Dashboard
            </button>
            <button onClick={() => navigate('/workflow')} className="nav-link">
              Workflow
            </button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">
              AI-Driven Business Process Orchestration
            </h1>
            <p className="hero-subtitle">
              Seamlessly integrate CRM and ERP with Composio + n8n
            </p>
            <p className="hero-description">
              Experience how intelligent automation can transform your VIP order processing 
              with real-time inventory management, tax calculation, and multi-system orchestration.
            </p>
            <div className="hero-buttons">
              <button 
                className="btn btn-primary btn-lg"
                onClick={() => navigate('/dashboard')}
              >
                View Live Demo
              </button>
              <button 
                className="btn btn-secondary btn-lg"
                onClick={() => navigate('/workflow')}
              >
                See Workflow
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <h2 className="section-title">Key Features</h2>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card card">
                <div className="feature-icon">{feature.icon}</div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Workflow Section */}
      <section className="workflow-section">
        <div className="container">
          <h2 className="section-title">How It Works</h2>
          <div className="workflow-steps">
            {workflow.map((item, index) => (
              <div key={index} className="workflow-step">
                <div className="step-number">{item.step}</div>
                <div className="step-content">
                  <h3 className="step-title">{item.title}</h3>
                  <p className="step-desc">{item.desc}</p>
                </div>
                {index < workflow.length - 1 && (
                  <div className="step-arrow">→</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="benefits">
        <div className="container">
          <h2 className="section-title">Why Composio + n8n?</h2>
          <div className="benefits-grid">
            <div className="benefit-item">
              <h3>⏱️ Save Time</h3>
              <p>Automate complex workflows that would take hours manually</p>
            </div>
            <div className="benefit-item">
              <h3>🎯 Increase Accuracy</h3>
              <p>Eliminate human errors in data entry and processing</p>
            </div>
            <div className="benefit-item">
              <h3>🔄 Real-time Sync</h3>
              <p>Keep all systems updated simultaneously</p>
            </div>
            <div className="benefit-item">
              <h3>📈 Scale Easily</h3>
              <p>Handle increasing order volumes without additional resources</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Ready to Transform Your Business?</h2>
            <p className="cta-text">
              See how Composio + n8n can automate your business processes
            </p>
            <button 
              className="btn btn-primary btn-lg"
              onClick={() => navigate('/dashboard')}
            >
              Try the Demo Now
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p>© 2026 Wyni Technology. Built with ❤️ for intelligent automation.</p>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;

