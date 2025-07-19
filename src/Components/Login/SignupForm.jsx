import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const SignupForm = ({
  username,
  setUsername,
  email,
  setEmail,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  onSubmit,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <form onSubmit={onSubmit} className="w-full max-w-md overflow-hidden space-y-3">

      <div>
        <label className="block text-indigo-600 font-medium mb-1">Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          placeholder="yourusername"
          autoComplete="new-username"
          className="w-full rounded-lg border border-indigo-300 px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none transition"
        />
      </div>

      <div>
        <label className="block text-indigo-600 font-medium mb-1">Email Address</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="you@example.com"
          autoComplete="email"
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
    autoComplete="new-password"
    className="w-full rounded-lg border border-indigo-300 px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none transition"
  />
  <button
    type="button"
    onClick={() => setShowPassword(!showPassword)}
    className="absolute right-3 top-11 text-indigo-500"
  >
    {showPassword ? <FaEyeSlash /> : <FaEye />}
  </button>
  <p className="text-sm text-red-500 mt-1">
    Use at least 8 characters, including uppercase, lowercase, number, and symbol.
  </p>
</div>


      <div className="relative">
        <label className="block text-indigo-600 font-medium mb-1">Confirm Password</label>
        <input
          type={showConfirmPassword ? 'text' : 'password'}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          placeholder="********"
          autoComplete="new-password"
          className="w-full rounded-lg border border-indigo-300 px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none transition"
        />
        <button
          type="button"
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          className="absolute right-3 top-11 text-indigo-500"
        >
          {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
        </button>
      </div>

      <button
        type="submit"
        className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-lg hover:rounded-lg font-semibold hover:from-purple-600 hover:to-indigo-600 transition-transform transform hover:scale-105"
      >
        Sign Up
      </button>
    </form>
  );
};

export default SignupForm;
