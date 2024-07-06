// RouteGuard.jsx
import { Navigate } from 'react-router-dom';

export const UserRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem('token');
  return isAuthenticated ? children : <Navigate to="/signin" replace />;
};

export const AdminRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem('adminToken');
  return isAuthenticated ? children : <Navigate to="/admin/signin" replace />;
};
