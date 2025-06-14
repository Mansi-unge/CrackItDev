import axios from "axios";

export const fetchTechTotalCount = async (tech) => {
  const response = await axios.get(`http://localhost:5000/api/coding/count`, {
    params: { tech },
  });
  return response.data.count;
};

export const fetchUserSolvedQuestionsForTech = async (token, tech) => {
  const response = await axios.get(`http://localhost:5000/api/coding/progress`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const solvedQuestions = response.data.solvedCodingQuestions || [];
  const filtered = solvedQuestions.filter(
    (q) => q.techStack === tech && q.isCorrect
  );
  return filtered.length;
};
