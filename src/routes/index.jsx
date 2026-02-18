import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';
import Dashboard from '../pages/dashboard/Dashboard';
import ResetPassword from '../pages/ResetPassword/ResetPassword';
import CreateNewPassword from '../pages/CreateNewPassword/CreateNewPassword';
import PendingApproval from '../pages/PendingApproval/PendingApproval';
import ArtistOnboarding from '../pages/ArtistOnboarding/ArtistOnboarding';
import ProtectedRoute from './ProtectedRoute';
import Home from '../pages/Home/Home';
import ArtistProfile from '../pages/Artist Profile/ArtistProfile';
import CreativeBreif from '../pages/Creative Breif/CreativeBreif';
import AddOns from '../pages/AddOns/AddOns';
import { useAuth } from '../context/AuthContext';
import ReviewAndPay from '../pages/Review & Pay/ReviewAndPay';
import ProductDetail from '../pages/ProductDetail/ProductDetail';

const AppRoutes = () => {
  const { isAuthenticated, user, isVerifiedArtist } = useAuth();
  const isArtist = user?.role?.includes('artist');
  console.log('isArtist:', isArtist, 'isVerifiedArtist:', isVerifiedArtist);
  
  return (
    <Routes>
      {/* Public Routes */}
      <Route 
        path="/login" 
        element={
          !isAuthenticated ? (
            <Login />
          ) : isArtist && !isVerifiedArtist ? (
            <Navigate to="/artist-onboarding" replace />
          ) : isArtist ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <Navigate to="/home" replace />
          )
        } 
      />

      <Route 
        path="/register" 
        element={
          !isAuthenticated ? (
            <Register />
          ) : isArtist && !isVerifiedArtist ? (
            <Navigate to="/artist-onboarding" replace />
          ) : isArtist ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <Navigate to="/home" replace />
          )
        } 
      />
      <Route path="/forgot-password" element={!isAuthenticated ? <ResetPassword /> : <Navigate to="/dashboard" replace />} />
      <Route path="/reset-password/:token" element={!isAuthenticated ? <CreateNewPassword /> : <Navigate to="/dashboard" replace />} />
      
      {/* Artist Onboarding - only for authenticated unverified artists */}
      <Route 
        path="/artist-onboarding" 
        element={
          !isAuthenticated ? (
            <Navigate to="/login" replace />
          ) : !isArtist ? (
            <Navigate to="/home" replace />
          ) : isVerifiedArtist ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <ArtistOnboarding />
          )
        } 
      />
      
      <Route path="/pending-approval" element={<PendingApproval />} />
      
      {/* Protected Routes */}
      <Route
        path="/dashboard"
        element={
          !isAuthenticated ? (
            <Navigate to="/login" replace />
          ) : !isArtist ? (
            <Navigate to="/home" replace />
          ) : !isVerifiedArtist ? (
            <Navigate to="/artist-onboarding" replace />
          ) : (
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          )
        }
      />
      
      {/* Public Home and Artist Routes */}
      <Route path="/home" element={<Home />} />
      <Route path="/artist/:artistId" element={<ArtistProfile />} />
      
      {/* Product Detail Route */}
      <Route path="/product/:merchandizeId" element={<ProductDetail />} />
      
      {/* Order Flow Routes */}
      <Route path="/creative-brief" element={<CreativeBreif />} />
      <Route path="/add-ons" element={<AddOns />} />
      <Route path="/review-payment" element={<ReviewAndPay />} />
      {/* TODO: Add route for /review-payment */}
      
      {/* Default Route */}
      <Route path="/" element={<Navigate to="/home" replace />} />

      {/* 404 Route */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default AppRoutes;
