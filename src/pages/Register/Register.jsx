import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { authAPI } from '../../api/auth';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Button from '../../components/Button';
import Input from '../../components/Input';

const Register = () => {
  const [accountType, setAccountType] = useState('artist');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (formData.password.length < 8) {
      toast.error('Password must be at least 8 characters');
      return;
    }

    // Only process artist signups for now
    if (accountType === 'artist') {
      setIsLoading(true);
      
      try {
        const data = await authAPI.register({
          fullname: formData.fullName,
          email: formData.email,
          password: formData.password,
          role: 'artist',
        });
        setUser(data.user);
        toast.success('Account created successfully!');
        // Redirect to artist onboarding page
        navigate('/artist-onboarding');
      } catch (error) {
        toast.error(error.response?.data?.message || 'Registration failed. Please try again.');
      } finally {
        setIsLoading(false);
      }
    } else {
      toast.info('Ambassador signup is coming soon!');
    }
  };

  return (
    <div className="max-h-screen flex">
      {/* Left Side - Image */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        <img 
          src="/signup.png" 
          alt="Musician with guitar" 
          className="w-full h-full object-left"
        />
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md space-y-6">
          {/* Account Type Toggle */}
          <div className="flex gap-4 mb-8">
            <button
              type="button"
              onClick={() => setAccountType('artist')}
              className={`flex-1 text-left p-3 rounded-[40px] border-2 transition-all ${
                accountType === 'artist' 
                  ? 'border-primary bg-secondary/20' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  accountType === 'artist' ? 'bg-primary' : 'bg-gray-300'
                }`}>
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                  </svg>
                </div>
                <span className="font-semibold text-gray-900">Artist</span>
              </div>
              <p className="text-xs text-gray-600">Create Cover Songs</p>
            </button>

            <button
              type="button"
              onClick={() => setAccountType('ambassador')}
              className={`flex-1 text-left p-3 rounded-[40px] border-2 transition-all ${
                accountType === 'ambassador' 
                  ? 'border-primary bg-secondary/20' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  accountType === 'ambassador' ? 'bg-primary' : 'bg-gray-300'
                }`}>
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <span className="font-semibold text-gray-900">Ambassador</span>
              </div>
              <p className="text-xs text-gray-600">Request Custom Songs</p>
            </button>
          </div>

          {/* Title */}
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold text-gray-900">Create Your Account</h1>
            <p className="text-gray-600">Join SongSprouts and start your musical journey</p>
          </div>

          {/* Form */}
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <Input
              id="fullName"
              name="fullName"
              type="text"
              value={formData.fullName}
              onChange={handleInputChange}
              placeholder="Full Name"
              required
              disabled={isLoading}
              className="rounded-3xl"
            />

            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email Address"
              required
              disabled={isLoading}
              className="rounded-3xl"
            />

            <Input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Password"
              required
              disabled={isLoading}
              helperText="Minimum of 8 characters (3 types)"
              className="rounded-3xl"
            />

            <Button type="submit" variant="primary" fullWidth disabled={isLoading}>
              {isLoading ? 'CREATING ACCOUNT...' : `CREATE ${accountType.toUpperCase()} ACCOUNT`}
            </Button>

            <p className="text-center text-sm text-gray-600">
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => navigate('/login')}
                className="text-primary font-medium hover:underline"
              >
                Sign In here
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
