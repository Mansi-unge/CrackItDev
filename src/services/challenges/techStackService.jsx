// api/progressService.js
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

export const fetchTechTotalCount = async (tech) => {
  const response = await axios.get(`${API_BASE}/coding/count`, {
    params: { tech },
  });
  return response.data.count;
};

export const fetchUserSolvedQuestionsForTech = async (token, tech) => {
  const response = await axios.get(`${API_BASE}/coding/progress`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const solvedQuestions = response.data.solvedCodingQuestions || [];
  const filtered = solvedQuestions.filter(
    (q) => q.techStack === tech && q.isCorrect
  );
  return filtered.length;
};
