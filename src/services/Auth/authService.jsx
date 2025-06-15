import axios from 'axios';
const API_BASE = 'http://localhost:5000/api/users';

export const loginUser = async ({ username, password }) => {
  const { data } = await axios.post(`${API_BASE}/login`, { username, password });
  return data;
};

export const registerUser = async ({ username, email, password }) => {
  const { data } = await axios.post(`${API_BASE}/register`, { username, email, password });
  return data;
};

export const requestResetToken = async ({ email }) => {
  const { data } = await axios.post(`${API_BASE}/request-reset`, { email });
  return data;
};

export const resetPassword = async ({ token, newPassword }) => {
  const { data } = await axios.post(`${API_BASE}/reset-password`, { token, newPassword });
  return data;
};
