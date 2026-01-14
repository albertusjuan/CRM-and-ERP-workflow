import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './SettingsPage.css';
import api from '../services/api';

function SettingsPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [testing, setTesting] = useState({ n8n: false, composio: false });
  const [testResults, setTestResults] = useState({ n8n: null, composio: null });
  
  const [config, setConfig] = useState({
    n8n: {
      webhookUrl: '',
      baseUrl: 'http://localhost:5678',
      apiKey: ''
    },
    composio: {
      apiKey: '',
      baseUrl: 'https://api.composio.dev'
    }
  });

  const [isConfigured, setIsConfigured] = useState(false);

  useEffect(() => {
    loadConfig();
  }, []);

  const loadConfig = async () => {
    try {
      const response = await api.getConfig();
      if (response.data.success && response.data.config) {
        setConfig(response.data.config);
        setIsConfigured(response.data.config.isConfigured);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error loading config:', error);
      setLoading(false);
    }
  };

  const handleInputChange = (section, field, value) => {
    setConfig(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleTestN8n = async () => {
    setTesting(prev => ({ ...prev, n8n: true }));
    setTestResults(prev => ({ ...prev, n8n: null }));
    
    try {
      const response = await api.testN8nConnection(config.n8n.webhookUrl);
      setTestResults(prev => ({ 
        ...prev, 
        n8n: { 
          success: response.data.success, 
          message: response.data.message || response.data.hint 
        } 
      }));
    } catch (error) {
      setTestResults(prev => ({ 
        ...prev, 
        n8n: { 
          success: false, 
          message: error.message 
        } 
      }));
    } finally {
      setTesting(prev => ({ ...prev, n8n: false }));
    }
  };

  const handleTestComposio = async () => {
    setTesting(prev => ({ ...prev, composio: true }));
    setTestResults(prev => ({ ...prev, composio: null }));
    
    try {
      const response = await api.testComposioConnection(config.composio.apiKey);
      setTestResults(prev => ({ 
        ...prev, 
        composio: { 
          success: response.data.success, 
          message: response.data.message || response.data.hint 
        } 
      }));
    } catch (error) {
      setTestResults(prev => ({ 
        ...prev, 
        composio: { 
          success: false, 
          message: error.message 
        } 
      }));
    } finally {
      setTesting(prev => ({ ...prev, composio: false }));
    }
  };

  const handleSaveConfig = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const response = await api.updateConfig(config);
      if (response.data.success) {
        setIsConfigured(true);
        alert('Configuration saved successfully! You can now process orders.');
        navigate('/dashboard');
      } else {
        alert('Error: ' + response.data.message);
      }
    } catch (error) {
      alert('Error saving configuration: ' + error.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="settings-page">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="settings-page">
      {/* Header */}
      <header className="settings-header">
        <div className="container">
          <div className="header-content">
            <div>
              <h1>System Configuration</h1>
              <p>Configure your n8n and Composio API keys</p>
            </div>
            <div className="header-actions">
              <button onClick={() => navigate('/')} className="btn btn-secondary">
                Home
              </button>
              <button onClick={() => navigate('/dashboard')} className="btn btn-secondary">
                Dashboard
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Status Banner */}
      {!isConfigured && (
        <div className="status-banner warning">
          <div className="container">
            <span className="banner-icon">⚠️</span>
            <div>
              <h3>System Not Configured</h3>
              <p>Please configure n8n and Composio to start processing orders</p>
            </div>
          </div>
        </div>
      )}

      {isConfigured && (
        <div className="status-banner success">
          <div className="container">
            <span className="banner-icon">✅</span>
            <div>
              <h3>System Configured</h3>
              <p>Your system is ready to process orders</p>
            </div>
          </div>
        </div>
      )}

      {/* Configuration Form */}
      <section className="config-section">
        <div className="container">
          <form onSubmit={handleSaveConfig}>
            {/* n8n Configuration */}
            <div className="config-card card">
              <h2>🔧 n8n Configuration</h2>
              <p className="config-description">
                Configure your n8n workflow webhook URL and API credentials
              </p>

              <div className="form-group">
                <label>Webhook URL *</label>
                <input
                  type="url"
                  value={config.n8n.webhookUrl}
                  onChange={(e) => handleInputChange('n8n', 'webhookUrl', e.target.value)}
                  placeholder="http://localhost:5678/webhook/vip-order"
                  required
                />
                <small>Get this from your n8n workflow's webhook trigger node</small>
              </div>

              <div className="form-group">
                <label>n8n Base URL *</label>
                <input
                  type="url"
                  value={config.n8n.baseUrl}
                  onChange={(e) => handleInputChange('n8n', 'baseUrl', e.target.value)}
                  placeholder="http://localhost:5678"
                  required
                />
                <small>Usually http://localhost:5678 for local setup</small>
              </div>

              <div className="form-group">
                <label>API Key (Optional)</label>
                <input
                  type="password"
                  value={config.n8n.apiKey}
                  onChange={(e) => handleInputChange('n8n', 'apiKey', e.target.value)}
                  placeholder="Your n8n API key (if required)"
                />
                <small>Only required if your n8n instance uses authentication</small>
              </div>

              <div className="test-section">
                <button
                  type="button"
                  onClick={handleTestN8n}
                  disabled={testing.n8n || !config.n8n.webhookUrl}
                  className="btn btn-secondary"
                >
                  {testing.n8n ? 'Testing...' : 'Test Connection'}
                </button>
                
                {testResults.n8n && (
                  <div className={`test-result ${testResults.n8n.success ? 'success' : 'error'}`}>
                    <span>{testResults.n8n.success ? '✅' : '❌'}</span>
                    <span>{testResults.n8n.message}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Composio Configuration */}
            <div className="config-card card">
              <h2>🔗 Composio Configuration</h2>
              <p className="config-description">
                Configure your Composio API key for app integrations
              </p>

              <div className="form-group">
                <label>API Key *</label>
                <input
                  type="password"
                  value={config.composio.apiKey}
                  onChange={(e) => handleInputChange('composio', 'apiKey', e.target.value)}
                  placeholder="Your Composio API key"
                  required
                />
                <small>Get your API key from <a href="https://app.composio.dev" target="_blank" rel="noopener noreferrer">app.composio.dev</a></small>
              </div>

              <div className="form-group">
                <label>Base URL</label>
                <input
                  type="url"
                  value={config.composio.baseUrl}
                  onChange={(e) => handleInputChange('composio', 'baseUrl', e.target.value)}
                  placeholder="https://api.composio.dev"
                  required
                />
                <small>Default Composio API endpoint</small>
              </div>

              <div className="test-section">
                <button
                  type="button"
                  onClick={handleTestComposio}
                  disabled={testing.composio || !config.composio.apiKey}
                  className="btn btn-secondary"
                >
                  {testing.composio ? 'Testing...' : 'Test Connection'}
                </button>
                
                {testResults.composio && (
                  <div className={`test-result ${testResults.composio.success ? 'success' : 'error'}`}>
                    <span>{testResults.composio.success ? '✅' : '❌'}</span>
                    <span>{testResults.composio.message}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Save Button */}
            <div className="save-section">
              <button type="submit" disabled={saving} className="btn btn-primary btn-lg">
                {saving ? 'Saving...' : 'Save Configuration'}
              </button>
            </div>
          </form>

          {/* Help Section */}
          <div className="help-section">
            <h3>📚 Setup Guide</h3>
            <ol>
              <li>
                <strong>Start n8n:</strong> Run <code>npx n8n</code> in your terminal
              </li>
              <li>
                <strong>Import Workflow:</strong> Go to n8n (http://localhost:5678) and import the workflow from <code>n8n-workflows/vip-order-workflow.json</code>
              </li>
              <li>
                <strong>Activate Workflow:</strong> Toggle the workflow to active
              </li>
              <li>
                <strong>Copy Webhook URL:</strong> Get the webhook URL from the trigger node
              </li>
              <li>
                <strong>Get Composio API Key:</strong> Sign up at <a href="https://app.composio.dev" target="_blank" rel="noopener noreferrer">app.composio.dev</a> and copy your API key
              </li>
              <li>
                <strong>Configure Here:</strong> Enter the URLs and keys above
              </li>
              <li>
                <strong>Test & Save:</strong> Test connections and save configuration
              </li>
            </ol>
          </div>
        </div>
      </section>
    </div>
  );
}

export default SettingsPage;

