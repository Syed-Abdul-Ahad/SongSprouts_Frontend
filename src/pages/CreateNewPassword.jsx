import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Button from '../components/Button';
import Input from '../components/Input';

const CreateNewPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (newPassword.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      // TODO: Implement password reset API call with token from URL
      // const token = searchParams.get('token');
      // await resetPassword(token, newPassword);
      navigate('/login');
    } catch (err) {
      setError('Failed to reset password. The link may have expired.');
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
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <Input
              id="newPassword"
              name="newPassword"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="New Password"
              required
              className="rounded-3xl"
            />

            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
              required
              className="rounded-3xl"
            />

            <Button type="submit" variant="primary" fullWidth>
              CHANGE PASSWORD
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateNewPassword;
