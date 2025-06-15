import axios from "axios";

const API_BASE = "http://localhost:5000/api/theory";

export const fetchTheoryQuestions = async ({ filters, page, pageSize }) => {
  const query = [];
  Object.entries(filters).forEach(([key, value]) => {
    if (value.length) query.push(`${key}=${value.join(",")}`);
  });
  query.push(`page=${page}`, `pageSize=${pageSize}`);

  const { data } = await axios.get(`${API_BASE}/questions?${query.join("&")}`);
  return data;
};