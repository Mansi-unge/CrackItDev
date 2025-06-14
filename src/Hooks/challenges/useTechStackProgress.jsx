import { useState, useEffect } from "react"
import { fetchTechTotalCount, fetchUserSolvedQuestionsForTech } from "../../services/challenges/techStackService";

const useTechStackProgress = (tech) => {
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [solvedCount, setSolvedCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProgress = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const total = await fetchTechTotalCount(tech);
        setTotalQuestions(total);

        const token = localStorage.getItem("token");
        if (token) {
          const solved = await fetchUserSolvedQuestionsForTech(token, tech);
          setSolvedCount(solved);
        } else {
          setSolvedCount(0);
        }
      } catch (err) {
        setError("Failed to load progress.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadProgress();
  }, [tech]);

  return { totalQuestions, solvedCount, isLoading, error };
};

export default useTechStackProgress;
