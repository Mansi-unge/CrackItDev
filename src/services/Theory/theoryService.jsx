import axios from "axios";

const BASE_URL = "http://localhost:5000/api/theory";

export const fetchTheoryQuestions = async (query) => {
  const { data } = await axios.get(`${BASE_URL}/questions?${query}`);
  return data;
};
