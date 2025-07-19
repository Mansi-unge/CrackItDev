import React from 'react';
import useAuth from '../Hooks/Auth/useAuth';
import Tabs from '../Components/Login/Tabs';
import LoginForm from '../Components/Login/LoginForm';
import SignupForm from '../Components/Login/SignupForm';
import PasswordReset from '../Components/Login/PasswordReset';
import SideContent from '../Components/Login/SideContent';
import { motion, AnimatePresence } from 'framer-motion';

const transitionVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

const Login = () => {
  const auth = useAuth();

  return (
    <div className="h-screen flex flex-col md:flex-row transition-all lg:overflow-hidden duration-700 ease-in-out bg-gray-50">
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

        <AnimatePresence mode="wait">
          {!auth.showReset && auth.activeTab === 'login' && (
            <motion.div
              key="login"
              variants={transitionVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.5 }}
              className="w-full"
            >
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
            </motion.div>
          )}

          {!auth.showReset && auth.activeTab === 'signup' && (
            <motion.div
              key="signup"
              variants={transitionVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.5 }}
              className="w-full"
            >
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
            </motion.div>
          )}

          {auth.showReset && (
            <motion.div
              key="reset"
              variants={transitionVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.5 }}
              className="w-full"
            >
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
            </motion.div>
          )}
        </AnimatePresence>

        <p className="text-center text-indigo-400 mt-6 text-xs select-none">
          © 2025 CrackIt.dev. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Login;
