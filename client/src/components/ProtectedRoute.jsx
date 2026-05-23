import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="app-container">
        <div className="auth-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '200px' }}>
          <div className="spinner" style={{ width: '40px', height: '40px', borderWidth: '3px', marginBottom: '1.5rem' }}></div>
          <p style={{ color: 'hsl(var(--text-secondary))', fontFamily: 'var(--font-heading)', fontWeight: '500' }}>Securing Connection...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
