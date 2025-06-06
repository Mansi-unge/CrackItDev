import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const LoginForm = ({ username, setUsername, password, setPassword, onSubmit, error, success, toggleShowPassword }) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
    toggleShowPassword && toggleShowPassword(!showPassword);
  };

  return (
    <form onSubmit={onSubmit} className="w-full max-w-md space-y-6">
      {error && <p className="mb-4 text-red-600 font-semibold">{error}</p>}
      {success && <p className="mb-4 text-green-600 font-semibold">{success}</p>}

      <div>
        <label className="block text-indigo-600 font-medium mb-1">Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          placeholder="yourusername"
          autoComplete="username"
          className="w-full rounded-lg border border-indigo-300 px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none transition"
        />
      </div>

      <div className="relative">
        <label className="block text-indigo-600 font-medium mb-1">Password</label>
        <input
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="********"
          autoComplete="current-password"
          className="w-full rounded-lg border border-indigo-300 px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none transition"
        />
        <button
          type="button"
          onClick={handleTogglePassword}
          className="absolute right-3 top-11 text-indigo-500"
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </button>
      </div>

      <button
        type="submit"
        className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-indigo-600 transition-transform transform hover:scale-105"
      >
        Login
      </button>
    </form>
  );
};

export default LoginForm
