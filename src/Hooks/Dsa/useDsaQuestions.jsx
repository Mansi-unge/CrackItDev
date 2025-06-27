// hooks/dsa/useDsaQuestions.js
import { useEffect, useState } from "react";
import { fetchDsaQuestions } from "../../services/Dsa/dsaService";

const useDsaQuestions = (filters = {}) => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        const fetched = await fetchDsaQuestions(filters);
        setQuestions(fetched);
      } catch (error) {
        console.error("Failed to load DSA questions", error);
      } finally {
        setLoading(false);
      }
    };

    loadQuestions();
  }, [JSON.stringify(filters)]);

  return { questions, loading };
};

export default useDsaQuestions;
