import { createContext, useContext, useState } from 'react';
import { authAPI } from '../api/auth';
import { artistAPI } from '../api/artist';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [isVerifiedArtist, setIsVerifiedArtist] = useState(false);

  // Helper function to set user and verification status together
  const setUserWithVerification = (userData, verified = false) => {
    setUser(userData);
    setIsVerifiedArtist(verified);
  };

  const checkAuth = async () => {
    try {
      const userData = await authAPI.getCurrentUser();
      const user = userData?.data?.user || userData?.data;
      setUser(user);
      // Store current user ID in localStorage for OrderContext
      if (user?._id) {
        localStorage.setItem('currentUserId', user._id);
      }
      // Check if artist is verified
      if (user?.role?.includes('artist')) {
        await checkArtistApprovalStatus(user._id);
      }
    } catch (error) {
      setUser(null);
      localStorage.removeItem('currentUserId');
    } finally {
      setIsCheckingAuth(false);
    }
  };

  const checkArtistApprovalStatus = async (userId) => {
    try {
      const profile = await artistAPI.getProfile(userId);
      const profileData = profile?.data?.artist;
      
      // Set isVerifiedArtist to true only if approvedByAdmin is true
      const isApproved = profileData?.approvedByAdmin === true;
      setIsVerifiedArtist(isApproved);
      return isApproved;
    } catch (error) {
      console.error('Error checking artist approval status:', error);
      setIsVerifiedArtist(false);
      return false;
    }
  };

  const logout = async () => {
    try {
      await authAPI.logout();
      setUser(null);
      setIsVerifiedArtist(false);
      // Clear user ID and order data on logout
      localStorage.removeItem('currentUserId');
      localStorage.removeItem('songOrderData');
    } catch (error) {
      console.error('Logout error:', error);
      setUser(null);
      setIsVerifiedArtist(false);
      localStorage.removeItem('currentUserId');
      localStorage.removeItem('songOrderData');
    }
  };

  const value = {
    user,
    setUser,
    setUserWithVerification,
    isCheckingAuth,
    checkAuth,
    logout,
    isAuthenticated: !!user,
    isVerifiedArtist,
    setIsVerifiedArtist,
    checkArtistApprovalStatus,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
