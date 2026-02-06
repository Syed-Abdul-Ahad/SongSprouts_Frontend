import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { authAPI } from '../../api/auth';

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await authAPI.forgotPassword(email);
      toast.success('Password reset instructions have been sent to your email!');
      setEmail(''); // Clear the form
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to send reset instructions. Please try again.';
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-h-screen flex">
      {/* Left Side - Image */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        <img 
          src="/signup.png" 
          alt="Musician with guitar illustration" 
          className="w-full h-full object-left"
        />
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md space-y-6">
          {/* Title */}
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold text-gray-900">Reset Your Password</h1>
            <p className="text-gray-600">
              Enter your email address and we'll send you instructions<br />
              to reset your password.
            </p>
          </div>

          {/* Info Box */}
          <div className="bg-green-50 border-l-4 border-primary p-4 rounded">
            <div className="flex">
              <div className="shrink-0">
                <svg className="h-5 w-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">What happens next?</p>
                <p className="text-xs text-[#039b17d7] mt-1">After submitting your email:</p>
                <ul className="text-xs text-[#039b17d7] mt-1 list-disc list-inside space-y-0.5">
                  <li>You'll receive a password reset email</li>
                  <li>The link expires in 24 hours for security</li>
                  <li>Check your spam folder if you don't see it</li>
                  <li>Follow the link to create a new password</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address"
                required
                disabled={isLoading}
                className="rounded-3xl"
              />
              <p className="text-xs text-gray-500 mt-2">Reset email will be sent to this address</p>
            </div>

            <Button type="submit" variant="primary" fullWidth disabled={isLoading}>
              {isLoading ? 'SENDING...' : 'SEND INSTRUCTIONS'}
            </Button>

            <p className="text-center text-sm text-gray-600">
              Don't have an account?{' '}
              <button
                type="button"
                onClick={() => navigate('/register')}
                className="text-primary font-medium hover:underline"
              >
                Sign up here
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
