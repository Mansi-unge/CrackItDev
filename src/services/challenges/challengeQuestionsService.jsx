import axios from "axios";

export const buildChallengeQuery = (filters) => {
  const params = new URLSearchParams();
  if (filters.tech.length) params.append("tech", filters.tech.join(","));
  if (filters.level.length) params.append("level", filters.level.join(","));
  if (filters.type.length) params.append("type", filters.type.join(","));
  if (filters.company.length) params.append("company", filters.company.join(","));
  params.append("page", 1);
  params.append("pageSize", 15);
  return params.toString();
};

export const fetchCodingQuestions = async (queryString) => {
  const res = await axios.get(`http://localhost:5000/api/coding?${queryString}`);
  return res.data;
};

export const fetchSolvedQuestionIds = async (token) => {
  const res = await axios.get("http://localhost:5000/api/coding/progress", {
    headers: { Authorization: `Bearer ${token}` },
  });

  return {
    solvedIds: res.data.solvedCodingQuestions.map((q) => q.questionId.toString()),
    badges: res.data.badges,
  };
};
