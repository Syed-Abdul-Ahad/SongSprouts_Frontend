import { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';
import { useAuth } from './context/AuthContext';
import AppRoutes from './routes';

function App() {
  const { checkAuth, isCheckingAuth, user } = useAuth();

  useEffect(() => {
    checkAuth();
  }, []);

  if (isCheckingAuth && !user) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <>
      <AppRoutes />
      <Toaster
        position="top-right"
        reverseOrder={false}
        gutter={8}
        toastOptions={{
          // Define default options
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          // Default options for specific types
          success: {
            duration: 3000,
            style: {
              background: '#10b981',
              color: '#fff',
            },
            iconTheme: {
              primary: '#fff',
              secondary: '#10b981',
            },
          },
          error: {
            duration: 4000,
            style: {
              background: '#ef4444',
              color: '#fff',
            },
            iconTheme: {
              primary: '#fff',
              secondary: '#ef4444',
            },
          },
        }}
      />
    </>
  );
}

export default App;
