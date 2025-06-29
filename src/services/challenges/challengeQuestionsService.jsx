// api/codingService.js
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

export const buildChallengeQuery = (filters) => {
  const params = new URLSearchParams();

  if (filters.tech?.length) params.append("tech", filters.tech.join(","));
  if (filters.level?.length) params.append("level", filters.level.join(","));
  if (filters.company?.length) params.append("company", filters.company.join(","));

  return params.toString();
};


export const fetchCodingQuestions = async (queryString) => {
  const res = await axios.get(`${API_BASE}/coding?${queryString}`);
  return res.data;
};

export const fetchSolvedQuestionIds = async (token) => {
  const res = await axios.get(`${API_BASE}/coding/progress`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return {
    solvedIds: res.data.solvedCodingQuestions.map((q) => q.questionId.toString()),
    badges: res.data.badges,
  };
};
