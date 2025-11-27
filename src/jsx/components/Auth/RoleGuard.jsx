import React from 'react';
import { useAuth } from '../../../context/AuthContext';

const RoleGuard = ({ allowedRoles, children }) => {
  const { role, loading } = useAuth();

  if (loading) {
    return null; 
  }

  if (!role || !allowedRoles.includes(role)) {
    return null;
  }

  return <>{children}</>;
};

export default RoleGuard;
