import { Navigate, Outlet } from 'react-router-dom';
import useAdminAuth from '../../hooks/useAdminAuth';
import { ReactNode } from 'react';

export default function RequireAdmin({ children }: { children?: ReactNode }) {
  const { isAuthenticated } = useAdminAuth();
  if (!isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }
  return children ? <>{children}</> : <Outlet />;
} 