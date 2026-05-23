import React from 'react';
import { useAuth } from '../context/AuthContext';
import { LogOut, User, Shield, Calendar, Activity, CheckCircle } from 'lucide-react';

const Dashboard = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  // Get first letter of username for avatar
  const getAvatarLetter = () => {
    if (!user || !user.username) return 'U';
    return user.username.charAt(0).toUpperCase();
  };

  // Format dates cleanly
  const getJoinDate = () => {
    if (!user || !user.createdAt) return 'Recent';
    const date = new Date(user.createdAt);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="app-container" style={{ flexDirection: 'column', padding: '2rem 1.5rem' }}>
      <div className="dashboard-container">
        
        {/* Navigation */}
        <nav className="dashboard-nav">
          <span className="nav-brand">AuraAuth</span>
          <button className="btn-logout" onClick={handleLogout} aria-label="Log Out">
            <LogOut size={16} />
            <span>Log Out</span>
          </button>
        </nav>

        {/* Dashboard Content Grid */}
        <div className="dashboard-grid">
          
          {/* Profile Card */}
          <div className="dashboard-card profile-card">
            <div className="profile-avatar">
              {getAvatarLetter()}
            </div>
            <h3 className="profile-username">{user?.username || 'User'}</h3>
            <p className="profile-email">{user?.email || 'email@example.com'}</p>
            <span className="profile-badge">Standard Access</span>
          </div>

          {/* Details Panel Card */}
          <div className="dashboard-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <h2 className="info-title">Secure Portal Terminal</h2>
            <p className="info-desc">
              Welcome to your private encrypted space. From here, you can manage your verified security keys, audit access logs, and configure workspace nodes.
            </p>

            <div className="stats-grid">
              
              <div className="stat-item">
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <Shield size={16} style={{ color: 'hsl(var(--accent-violet))' }} />
                  <span className="stat-label">Security Shield</span>
                </div>
                <div className="stat-value" style={{ color: 'hsl(var(--color-success))', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '1.1rem' }}>
                  <CheckCircle size={16} />
                  <span>Fully Encrypted</span>
                </div>
              </div>

              <div className="stat-item">
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <Activity size={16} style={{ color: 'hsl(var(--accent-pink))' }} />
                  <span className="stat-label">Database Status</span>
                </div>
                <div className="stat-value" style={{ color: 'hsl(var(--color-success))', fontSize: '1.1rem' }}>
                  Active Node
                </div>
              </div>

              <div className="stat-item">
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <Calendar size={16} style={{ color: 'hsl(var(--accent-indigo))' }} />
                  <span className="stat-label">Registration</span>
                </div>
                <div className="stat-value" style={{ fontSize: '0.95rem', fontWeight: '600' }}>
                  {getJoinDate()}
                </div>
              </div>

              <div className="stat-item">
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <User size={16} style={{ color: 'hsl(var(--text-secondary))' }} />
                  <span className="stat-label">Client Host</span>
                </div>
                <div className="stat-value" style={{ fontSize: '0.95rem', fontWeight: '600' }}>
                  Web Browser
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;
