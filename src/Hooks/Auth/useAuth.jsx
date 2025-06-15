import { useState } from 'react';
import { loginUser , registerUser , requestResetToken, resetPassword } from '../../services/Auth/authService';
import { useNavigate } from 'react-router-dom';

const useAuth = () => {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('login');
  const [showReset, setShowReset] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [resetEmail, setResetEmail] = useState('');
  const [resetToken, setResetToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
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
        const data = await loginUser({ username, password });
        setSuccess(data.message);
        localStorage.setItem('token', data.token);
        navigate('/');
      } else {
        const data = await registerUser({ username, email, password });
        setSuccess(data.message);
        setActiveTab('login');
        resetFields();
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleRequestReset = async () => {
    try {
      if (!resetEmail) {
        setError('Please enter your registered email');
        return;
      }
      const data = await requestResetToken({ email: resetEmail });
      alert(`Reset token: ${data.resetToken}`);
      resetMessages();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleResetPassword = async () => {
    try {
      if (!resetToken || !newPassword) {
        setError('Please fill all reset fields');
        return;
      }
      await resetPassword({ token: resetToken, newPassword });
      alert('Password reset successful');
      setShowReset(false);
      setResetEmail('');
      setResetToken('');
      setNewPassword('');
      resetMessages();
    } catch (err) {
      setError(err.message);
    }
  };

  return {
    // states
    activeTab, setActiveTab, showReset, setShowReset,
    username, setUsername, email, setEmail,
    password, setPassword, confirmPassword, setConfirmPassword,
    resetEmail, setResetEmail, resetToken, setResetToken, newPassword, setNewPassword,
    error, success,
    // handlers
    handleSubmit, handleRequestReset, handleResetPassword,
    resetMessages, resetFields
  };
};

export default useAuth;
