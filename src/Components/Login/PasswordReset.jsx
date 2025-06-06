import React from 'react';

const PasswordReset = ({
  resetEmail,
  setResetEmail,
  resetToken,
  setResetToken,
  newPassword,
  setNewPassword,
  onRequestReset,
  onResetPassword,
  onCancel,
}) => {
  return (
    <div className="w-full max-w-md space-y-6 mt-10 p-6 border border-indigo-200 rounded-lg shadow-sm bg-gray-50">
      <h2 className="text-xl font-semibold text-indigo-700 text-center">Reset Password</h2>

      <div>
        <label className="block text-indigo-600 font-medium mb-1">Email</label>
        <input
          type="email"
          value={resetEmail}
          onChange={(e) => setResetEmail(e.target.value)}
          placeholder="Enter your registered email"
          className="w-full rounded-lg border border-indigo-300 px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none transition"
        />
      </div>

      <button
        onClick={onRequestReset}
        className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition"
      >
        Request Reset Token
      </button>

      <div>
        <label className="block text-indigo-600 font-medium mb-1">Reset Token</label>
        <input
          type="text"
          value={resetToken}
          onChange={(e) => setResetToken(e.target.value)}
          placeholder="Paste reset token"
          className="w-full rounded-lg border border-indigo-300 px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none transition"
        />
      </div>

      <div>
        <label className="block text-indigo-600 font-medium mb-1">New Password</label>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="Enter new password"
          className="w-full rounded-lg border border-indigo-300 px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none transition"
        />
      </div>

      <button
        onClick={onResetPassword}
        className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition"
      >
        Reset Password
      </button>

      <button
        type="button"
        onClick={onCancel}
        className="text-sm text-indigo-400 hover:underline mt-2 block text-center"
      >
        Back to Login
      </button>
    </div>
  );
};

export default PasswordReset;
