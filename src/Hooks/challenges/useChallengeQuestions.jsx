import { useEffect, useState, useCallback } from "react";
import {
  fetchCodingQuestions,
  fetchSolvedQuestionIds,
  buildChallengeQuery,
} from "../../services/challenges/challengeQuestionsService";

const useChallengeQuestions = (initialTech) => {
  const [solvedIds, setSolvedIds] = useState(new Set());
  const [badges, setBadges] = useState({ bronze: 0, silver: 0, golden: 0 });
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    tech: initialTech ? [initialTech] : [],
    level: [],
    type: ["Coding"],
    company: [],
  });

  // 🔁 Sync tech filter when `initialTech` changes from route param
  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      tech: initialTech ? [initialTech] : [],
    }));
  }, [initialTech]);

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
        .then(({ solvedIds, badges }) => {
          setSolvedIds(new Set(solvedIds));
          setBadges(badges);
        })
        .catch(console.error);
    }
  }, []);

  useEffect(() => {
    loadQuestions();
  }, [loadQuestions]);

  return { filters, setFilters, loading, questions, solvedIds, badges };
};

export default useChallengeQuestions;
