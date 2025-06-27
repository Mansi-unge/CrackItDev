  // services/dsa/dsaService.js
  import axios from "axios";

  // Use Vite env variable (must start with VITE_)
  const BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/dsa`;

  export const fetchDsaQuestions = async (filters = {}) => {
    const params = new URLSearchParams(filters).toString();
    const { data } = await axios.get(`${BASE_URL}?${params}`);
    return data.questions;
  };

  export const fetchDsaQuestionById = async (id) => {
    const { data } = await axios.get(`${BASE_URL}/${id}`);
    return data.question;
  };

  export const createDsaQuestion = async (questionData) => {
    const { data } = await axios.post(`${BASE_URL}/create`, questionData);
    return data;
  };
