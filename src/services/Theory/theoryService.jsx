import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/theory`;

export const fetchTheoryQuestions = async (query) => {
  const { data } = await axios.get(`${BASE_URL}/questions?${query}`);
  return data;
};
