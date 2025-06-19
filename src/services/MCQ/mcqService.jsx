import axios from "axios";

const BASE_URL = "http://localhost:5000/api/mcq";

export const fetchMCQProgress = async (token) => {
  const { data } = await axios.get(`${BASE_URL}/progress`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

export const fetchMCQQuestions = async (filters, page, pageSize) => {
  const query = [];
  if (filters.tech.length) query.push(`tech=${filters.tech.join(",")}`);
  if (filters.level.length) query.push(`level=${filters.level.join(",")}`);
  if (filters.type.length) query.push(`type=${filters.type.join(",")}`);
  if (filters.company.length) query.push(`company=${filters.company.join(",")}`);
  query.push(`page=${page}`);
  query.push(`pageSize=${pageSize}`);

  const { data } = await axios.get(`${BASE_URL}/filter?${query.join("&")}`);
  return data;
};

export const verifyMCQAnswer = async (questionId, selectedOption, token) => {
  const res = await axios.post(
    `${BASE_URL}/verify`,
    { questionId, selectedOption },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data?.answerExplanation || "No explanation provided.";
};

export const saveMCQProgress = async (
  questionId,
  selectedOption,
  isCorrect,
  explanation,
  token,
  techstack,
  topic
) => {
  await axios.post(
    `${BASE_URL}/save-progress`,
    { questionId, selectedOption, isCorrect, explanation, techstack, topic },
    { headers: { Authorization: `Bearer ${token}` } }
  );
};

