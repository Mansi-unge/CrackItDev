import React from 'react';
import useAuth from '../Hooks/Auth/useAuth';
import Tabs from '../Components/Login/Tabs';
import LoginForm from '../Components/Login/LoginForm';
import SignupForm from '../Components/Login/SignupForm';
import PasswordReset from '../Components/Login/PasswordReset';
import SideContent from '../Components/Login/SideContent';

const Login = () => {
  const auth = useAuth();

  return (
    <div className="min-h-screen flex flex-col md:flex-row transition-all lg:overflow-hidden duration-700 ease-in-out bg-gray-50">
      <SideContent isLogin={auth.activeTab === 'login'} />

      <div
        className={`md:w-1/2 w-full flex flex-col justify-center items-center bg-white px-10 py-16 transition-all duration-700 ease-in-out ${
          auth.activeTab === 'login' ? 'order-2 md:order-2' : 'order-1 md:order-1'
        }`}
      >
        {!auth.showReset && (
          <Tabs
            activeTab={auth.activeTab}
            setActiveTab={auth.setActiveTab}
            resetFields={auth.resetFields}
          />
        )}

        {!auth.showReset && auth.activeTab === 'login' && (
          <>
            <LoginForm
              username={auth.username}
              setUsername={auth.setUsername}
              password={auth.password}
              setPassword={auth.setPassword}
              onSubmit={auth.handleSubmit}
              error={auth.error}
              success={auth.success}
            />
            <div className="flex items-center justify-between text-sm text-indigo-600 mt-2 w-full max-w-md">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="accent-indigo-600" />
                Remember me
              </label>
              <button
                type="button"
                onClick={() => {
                  auth.setShowReset(true);
                  auth.resetMessages();
                }}
                className="hover:underline"
              >
                Forgot password?
              </button>
            </div>
          </>
        )}

        {!auth.showReset && auth.activeTab === 'signup' && (
          <SignupForm
            username={auth.username}
            setUsername={auth.setUsername}
            email={auth.email}
            setEmail={auth.setEmail}
            password={auth.password}
            setPassword={auth.setPassword}
            confirmPassword={auth.confirmPassword}
            setConfirmPassword={auth.setConfirmPassword}
            onSubmit={auth.handleSubmit}
            error={auth.error}
            success={auth.success}
          />
        )}

        {auth.showReset && (
          <PasswordReset
            resetEmail={auth.resetEmail}
            setResetEmail={auth.setResetEmail}
            resetToken={auth.resetToken}
            setResetToken={auth.setResetToken}
            newPassword={auth.newPassword}
            setNewPassword={auth.setNewPassword}
            onRequestReset={auth.handleRequestReset}
            onResetPassword={auth.handleResetPassword}
            onCancel={() => {
              auth.setShowReset(false);
              auth.setResetEmail('');
              auth.setResetToken('');
              auth.setNewPassword('');
              auth.resetMessages();
            }}
          />
        )}

        <p className="text-center text-indigo-400 mt-6 text-xs select-none">
          © 2025 CrackIt.dev. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Login;
