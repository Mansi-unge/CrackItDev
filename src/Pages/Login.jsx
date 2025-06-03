import React, { useState } from 'react';
import { FaGoogle } from 'react-icons/fa';
import Logo from '../Components/Logo';

const Login = () => {
  const [activeTab, setActiveTab] = useState('login');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: add your submit logic here
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-indigo-100 to-purple-200 flex items-center justify-center p-6">
      <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-md w-full">
        {/* Logo and Tagline */}
        <div className="flex flex-col items-center mb-6">
          <Logo className="mx-auto" />
          <p className="text-indigo-700 italic font-semibold mt-4 text-center">
            "Tech Interviews, Cracked the Right Way."
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center space-x-10 border-b border-indigo-300">
          {['login', 'signup'].map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                setShowPassword(false);
                setShowConfirmPassword(false);
              }}
              className={`relative pb-3 font-semibold transition-colors ${
                activeTab === tab
                  ? 'text-indigo-700'
                  : 'text-indigo-400 hover:text-indigo-600'
              }`}
              aria-current={activeTab === tab ? 'true' : undefined}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
              {/* underline */}
              {activeTab === tab && (
                <span className="absolute left-0 bottom-0 w-full h-1 bg-indigo-700 rounded-full transition-all"></span>
              )}
            </button>
          ))}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-indigo-600 font-medium mb-1">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              required
              placeholder="you@example.com"
              className="w-full rounded-lg border border-indigo-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              autoComplete="email"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <label htmlFor="password" className="block text-indigo-600 font-medium mb-1">
              Password
            </label>
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              required
              placeholder="********"
              className="w-full rounded-lg border border-indigo-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              autoComplete={activeTab === 'login' ? 'current-password' : 'new-password'}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-9 text-indigo-500 text-lg select-none"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              tabIndex={-1}
            >
              {showPassword ? '🙈' : '👁️'}
            </button>
          </div>

          {/* Confirm Password (signup only) */}
          {activeTab === 'signup' && (
            <div className="relative">
              <label htmlFor="confirm-password" className="block text-indigo-600 font-medium mb-1">
                Confirm Password
              </label>
              <input
                id="confirm-password"
                type={showConfirmPassword ? 'text' : 'password'}
                required
                placeholder="********"
                className="w-full rounded-lg border border-indigo-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                autoComplete="new-password"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-9 text-indigo-500 text-lg select-none"
                aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                tabIndex={-1}
              >
                {showConfirmPassword ? '🙈' : '👁️'}
              </button>
            </div>
          )}

          {/* Remember me & Forgot password */}
          <div className="flex items-center justify-between text-sm text-indigo-600">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input type="checkbox" className="accent-indigo-600" />
              Remember me
            </label>
            <a href="#" className="hover:underline">
              Forgot password?
            </a>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-purple-600 hover:to-indigo-600 text-white py-3 rounded-lg font-semibold shadow-md transition"
          >
            {activeTab === 'login' ? 'Login' : 'Sign Up'}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-indigo-400 mt-4 text-xs select-none">
          © 2025 CodePrep. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Login;
