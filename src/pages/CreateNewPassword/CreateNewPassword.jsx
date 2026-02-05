import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { authAPI } from '../../api/auth';

const CreateNewPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showValidation, setShowValidation] = useState(false);
  const { token } = useParams();
  const navigate = useNavigate();

  // Check if passwords match (only show if confirm password has content)
  const passwordsMatch = confirmPassword === '' || newPassword === confirmPassword;
  const isPasswordLongEnough = newPassword.length >= 8 || newPassword.length === 0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowValidation(true);

    // Validate password length
    if (newPassword.length < 8) {
      toast.error('Password must be at least 8 characters');
      return;
    }

    // Validate passwords match
    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match! Please check and try again.');
      return;
    }

    // If all validations pass, proceed with API call
    setIsLoading(true);

    try {
      await authAPI.resetPassword(token, newPassword);
      toast.success('Password has been reset successfully!');
      
      // Redirect to login after a short delay
      setTimeout(() => {
        navigate('/login');
      }, 1500);
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to reset password. The link may have expired.';
      toast.error(errorMessage);
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
            <h1 className="text-4xl font-bold text-gray-900">Create New Password</h1>
            <p className="text-gray-600">
              Enter your email address to resend the verification link. Check<br />
              your inbox and spam folder for the original email first.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                id="newPassword"
                name="newPassword"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="New Password"
                required
                disabled={isLoading}
                className="rounded-3xl"
              />
              {showValidation && !isPasswordLongEnough && (
                <p className="text-xs text-red-500 mt-1 ml-4">
                  Password must be at least 8 characters
                </p>
              )}
            </div>

            <div>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm Password"
                required
                disabled={isLoading}
                className="rounded-3xl"
              />
              {showValidation && confirmPassword && !passwordsMatch && (
                <p className="text-xs text-red-500 mt-1 ml-4">
                  Passwords do not match
                </p>
              )}
              {confirmPassword && passwordsMatch && newPassword.length >= 8 && (
                <p className="text-xs text-green-600 mt-1 ml-4">
                  ✓ Passwords match
                </p>
              )}
            </div>

            <Button 
              type="submit" 
              variant="primary" 
              fullWidth 
              disabled={isLoading || (showValidation && (!passwordsMatch || !isPasswordLongEnough))}
            >
              {isLoading ? 'CHANGING PASSWORD...' : 'CHANGE PASSWORD'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateNewPassword;
