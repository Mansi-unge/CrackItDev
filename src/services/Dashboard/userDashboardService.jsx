import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

export const fetchUserProfile = (token) =>
  axios.get(`${API_BASE}/users/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const fetchUserRank = (token) =>
  axios.get(`${API_BASE}/users/rank`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const fetchMcqProgress = (token) =>
  axios.get(`${API_BASE}/mcq/progress`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const fetchCodingProgress = (token) =>
  axios.get(`${API_BASE}/coding/progress`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const fetchRecentActivity = (token, userId) =>
  axios.get(`${API_BASE}/users/user/${userId}/recent-activity`, {
    headers: { Authorization: `Bearer ${token}` },
  });
