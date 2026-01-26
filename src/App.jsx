import { useState } from 'react';
import { useAuth } from './context/AuthContext';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';

function App() {
  const [showRegister, setShowRegister] = useState(false);
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  if (isAuthenticated) {
    return <Dashboard />;
  }

  return (
    <div>
      {showRegister ? <Register /> : <Login />}
      <div className="text-center mt-4">
        <button
          onClick={() => setShowRegister(!showRegister)}
          className="text-blue-600 hover:text-blue-800"
        >
          {showRegister
            ? 'Already have an account? Sign in'
            : "Don't have an account? Register"}
        </button>
      </div>
    </div>
  );
}

export default App;
