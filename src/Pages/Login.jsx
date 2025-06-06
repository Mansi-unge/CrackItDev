import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Tabs from '../Components/Login/Tabs';
import LoginForm from '../Components/Login/LoginForm';
import SignupForm from '../Components/Login/SignupForm';
import PasswordReset from '../Components/Login/PasswordReset';
import SideContent from '../Components/Login/SideContent';

const API_BASE = 'http://localhost:5000/api/users';

const Login = () => {
  const [activeTab, setActiveTab] = useState('login');
  const [showReset, setShowReset] = useState(false);
  const navigate = useNavigate();

  // Common fields
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState(''); // For signup
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Reset password fields
  const [resetEmail, setResetEmail] = useState('');
  const [resetToken, setResetToken] = useState('');
  const [newPassword, setNewPassword] = useState('');

  // Messages
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const resetMessages = () => {
    setError('');
    setSuccess('');
  };

  const resetFields = () => {
    setUsername('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    resetMessages();
  };

  // Request reset token
  const handleRequestReset = async () => {
    try {
      if (!resetEmail) {
        setError('Please enter your registered email');
        return;
      }
      const { data } = await axios.post(`${API_BASE}/request-reset`, { email: resetEmail });
      alert(`Reset token: ${data.resetToken}`);
      resetMessages();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to request reset');
    }
  };

  // Reset password
  const handleResetPassword = async () => {
    try {
      if (!resetToken || !newPassword) {
        setError('Please fill all reset fields');
        return;
      }
      await axios.post(`${API_BASE}/reset-password`, { token: resetToken, newPassword });
      alert('Password reset successful');
      setShowReset(false);
      setResetEmail('');
      setResetToken('');
      setNewPassword('');
      resetMessages();
    } catch (err) {
      setError(err.response?.data?.message || 'Reset failed');
    }
  };

  // Login or Signup submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    resetMessages();

    if (!username || !password || (activeTab === 'signup' && !email)) {
      setError('Please fill all required fields.');
      return;
    }

    if (activeTab === 'signup' && password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      if (activeTab === 'login') {
        const { data } = await axios.post(`${API_BASE}/login`, { username, password });
        setSuccess(data.message);
        localStorage.setItem('token', data.token);
        navigate('/');
      } else {
        const { data } = await axios.post(`${API_BASE}/register`, { username, email, password });
        setSuccess(data.message);
        setActiveTab('login');
        resetFields();
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row transition-all duration-700 ease-in-out bg-gray-50">
      <SideContent isLogin={activeTab === 'login'} />

      <div
        className={`md:w-1/2 w-full flex flex-col justify-center items-center bg-white px-10 py-16 transition-all duration-700 ease-in-out ${
          activeTab === 'login' ? 'order-2 md:order-2' : 'order-1 md:order-1'
        }`}
      >
        {!showReset && <Tabs activeTab={activeTab} setActiveTab={setActiveTab} resetFields={resetFields} />}

        {!showReset && activeTab === 'login' && (
          <>
            <LoginForm
              username={username}
              setUsername={setUsername}
              password={password}
              setPassword={setPassword}
              onSubmit={handleSubmit}
              error={error}
              success={success}
            />

            <div className="flex items-center justify-between text-sm text-indigo-600 mt-2 w-full max-w-md">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="accent-indigo-600" />
                Remember me
              </label>
              <button
                type="button"
                onClick={() => {
                  setShowReset(true);
                  resetMessages();
                }}
                className="hover:underline"
              >
                Forgot password?
              </button>
            </div>
          </>
        )}

        {!showReset && activeTab === 'signup' && (
          <SignupForm
            username={username}
            setUsername={setUsername}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            confirmPassword={confirmPassword}
            setConfirmPassword={setConfirmPassword}
            onSubmit={handleSubmit}
            error={error}
            success={success}
          />
        )}

        {showReset && (
          <PasswordReset
            resetEmail={resetEmail}
            setResetEmail={setResetEmail}
            resetToken={resetToken}
            setResetToken={setResetToken}
            newPassword={newPassword}
            setNewPassword={setNewPassword}
            onRequestReset={handleRequestReset}
            onResetPassword={handleResetPassword}
            onCancel={() => {
              setShowReset(false);
              setResetEmail('');
              setResetToken('');
              setNewPassword('');
              resetMessages();
            }}
          />
        )}

        <p className="text-center text-indigo-400 mt-6 text-xs select-none">© 2025 CrackIt.dev. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Login;
