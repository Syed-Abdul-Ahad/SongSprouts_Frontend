import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Dashboard from '../pages/Dashboard';
import ResetPassword from '../pages/ResetPassword';
import CreateNewPassword from '../pages/CreateNewPassword';
import PendingApproval from '../pages/PendingApproval';
import ProtectedRoute from './ProtectedRoute';
import Home from '../pages/Home/Home';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ResetPassword />} />
      <Route path="/reset-password/:token" element={<CreateNewPassword />} />
      <Route path="/pending-approval" element={<PendingApproval />} />
      
      {/* Protected Routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      
      {/* Default Route */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/home" element={<Home />} />

      {/* 404 Route */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default AppRoutes;
