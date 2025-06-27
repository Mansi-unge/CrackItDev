  import { useState } from 'react';
  import {
    loginUser,
    registerUser,
    requestResetToken,
    resetPassword,
  } from '../../services/Auth/authService';
  import { useNavigate } from 'react-router-dom';
  import { toast } from 'react-toastify';

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

    const resetFields = () => {
      setUsername('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
    };

   const handleSubmit = async (e) => {
  e.preventDefault();

  const passwordPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  if (!username || !password || (activeTab === 'signup' && !email)) {
    toast.error('Please fill all required fields');
    return;
  }

  if (activeTab === 'signup' && password !== confirmPassword) {
    toast.error('Passwords do not match');
    return;
  }

  if (activeTab === 'signup' && !passwordPattern.test(password)) {
    toast.error(
      'Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.'
    );
    return;
  }

  try {
    if (activeTab === 'login') {
      const data = await loginUser({ username, password });
      toast.success(data.message || 'Login successful');
      localStorage.setItem('token', data.token);
      navigate('/');
    } else {
      const data = await registerUser({ username, email, password });
      toast.success(data.message || 'Registration successful');
      setActiveTab('login');
      resetFields();
    }
  } catch (err) {
    const msg =
      err.response?.data?.message || err.message || 'Authentication failed';
    toast.error(msg);
  }
};


    const handleRequestReset = async () => {
      try {
        if (!resetEmail) {
          toast.error('Please enter your registered email');
          return;
        }
        const data = await requestResetToken({ email: resetEmail });
        alert(`Reset token: ${data.resetToken}`);
      } catch (err) {
        const msg =
          err.response?.data?.message || err.message || 'Reset request failed';
        toast.error(msg);
      }
    };

    const handleResetPassword = async () => {
      try {
        if (!resetToken || !newPassword) {
          toast.error('Please fill all reset fields');
          return;
        }
        await resetPassword({ token: resetToken, newPassword });
        toast.success('Password reset successful');
        setShowReset(false);
        setResetEmail('');
        setResetToken('');
        setNewPassword('');
      } catch (err) {
        const msg =
          err.response?.data?.message || err.message || 'Reset failed';
        toast.error(msg);
      }
    };

    return {
      // states
      activeTab,
      setActiveTab,
      showReset,
      setShowReset,
      username,
      setUsername,
      email,
      setEmail,
      password,
      setPassword,
      confirmPassword,
      setConfirmPassword,
      resetEmail,
      setResetEmail,
      resetToken,
      setResetToken,
      newPassword,
      setNewPassword,

      // handlers
      handleSubmit,
      handleRequestReset,
      handleResetPassword,
      resetFields,
    };
  };

  export default useAuth;
