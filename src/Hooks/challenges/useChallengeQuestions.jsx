import { useEffect, useState, useCallback } from "react"; 
import { fetchCodingQuestions , fetchSolvedQuestionIds , buildChallengeQuery } from "../../services/challenges/challengeQuestionsService";

const useChallengeQuestions = (initialTech) => {
  const [solvedIds, setSolvedIds] = useState(new Set());
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    tech: [initialTech],
    level: [],
    type: ["Coding"],
    company: [],
  });

  const loadQuestions = useCallback(() => {
    setLoading(true);
    const query = buildChallengeQuery(filters);
    fetchCodingQuestions(query)
      .then((res) => setQuestions(res?.questions || []))
      .catch(() => setQuestions([]))
      .finally(() => setLoading(false));
  }, [filters]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchSolvedQuestionIds(token)
        .then((ids) => setSolvedIds(new Set(ids)))
        .catch(console.error);
    }
  }, []);

  useEffect(() => {
    loadQuestions();
  }, [loadQuestions]);

  return { filters, setFilters, loading, questions, solvedIds };
};

export default useChallengeQuestions;
