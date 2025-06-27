// 📁 src/services/Dsa/dsaSolveService.js
import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/dsa`;

export const fetchDsaQuestionByIdService = async (id) => {
  const { data } = await axios.get(`${BASE_URL}/${id}`);
  return data.question;
};

export const fetchUserDsaSolutionService = async (questionId) => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  const { data } = await axios.get(`${BASE_URL}/user-solution/${questionId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return data.success ? data.solution : null;
};

// 📁 src/services/Dsa/dsaSolveService.js
export const submitDsaSolutionService = async ({ questionId, submittedCode, techStack }) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Not logged in");

  const { data } = await axios.post(
    `${BASE_URL}/submit-dsa-solution`,
    { questionId, submittedCode, techStack },
    { headers: { Authorization: `Bearer ${token}` } }
  );

  return data; // Return entire response instead of just data.success
};
