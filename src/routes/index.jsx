import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Dashboard from '../pages/Dashboard';
import ResetPassword from '../pages/ResetPassword';
import CreateNewPassword from '../pages/CreateNewPassword';
import PendingApproval from '../pages/PendingApproval';
import ProtectedRoute from './ProtectedRoute';
import Home from '../pages/Home/Home';
import ArtistProfile from '../pages/Artist Profile/ArtistProfile';

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
      
      {/* Public Home and Artist Routes */}
      <Route path="/home" element={<Home />} />
      <Route path="/artist/:artistId" element={<ArtistProfile />} />
      
      {/* Default Route */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* 404 Route */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default AppRoutes;
