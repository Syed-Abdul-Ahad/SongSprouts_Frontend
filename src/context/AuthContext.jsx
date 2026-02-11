import { createContext, useContext, useState } from 'react';
import { authAPI } from '../api/auth';

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

  const checkAuth = async () => {
    try {
      const userData = await authAPI.getCurrentUser();
      const user = userData?.data?.user || userData?.data;
      setUser(user);
      // Store current user ID in localStorage for OrderContext
      if (user?._id) {
        localStorage.setItem('currentUserId', user._id);
      }
    } catch (error) {
      setUser(null);
      localStorage.removeItem('currentUserId');
    } finally {
      setIsCheckingAuth(false);
    }
  };

  const logout = async () => {
    try {
      await authAPI.logout();
      setUser(null);
      // Clear user ID and order data on logout
      localStorage.removeItem('currentUserId');
      localStorage.removeItem('songOrderData');
    } catch (error) {
      console.error('Logout error:', error);
      setUser(null);
      localStorage.removeItem('currentUserId');
      localStorage.removeItem('songOrderData');
    }
  };

  const value = {
    user,
    setUser,
    isCheckingAuth,
    checkAuth,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
