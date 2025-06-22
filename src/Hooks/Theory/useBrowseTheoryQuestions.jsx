// useBrowseTheoryQuestions.js
import { useState, useEffect, useCallback } from "react";
import { fetchTheoryQuestions } from "../../services/Theory/theoryService";

const PAGE_SIZE = 15;

export default function useBrowseTheoryQuestions({ manual = false } = {}) {
  const [filters, setFilters] = useState({
    tech: [],
    level: [],
    type: ["Theory"],
    company: [],
  });
  const [questions, setQuestions] = useState([]);
  const [page, setPage] = useState(1);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [loading, setLoading] = useState(false);
  const [shouldFetch, setShouldFetch] = useState(!manual); // NEW

  const buildQuery = () => {
    const query = [];
    Object.entries(filters).forEach(([key, value]) => {
      if (value.length) query.push(`${key}=${value.join(",")}`);
    });
    query.push(`page=${page}`, `pageSize=${PAGE_SIZE}`);
    return query.join("&");
  };

  const loadQuestions = useCallback(async () => {
    try {
      setLoading(true);
      const data = await fetchTheoryQuestions(buildQuery());
      const newQuestions = data.questions;

      setTotalQuestions(data.total);
      setQuestions((prev) =>
        page === 1 ? newQuestions : [...prev, ...newQuestions]
      );
    } catch (error) {
      console.error("Error fetching questions:", error);
    } finally {
      setLoading(false);
    }
  }, [filters, page]);

  useEffect(() => {
    if (!shouldFetch) return;
    loadQuestions();
  }, [loadQuestions, shouldFetch]);

  useEffect(() => {
    if (shouldFetch) {
      setPage(1);
    }
  }, [filters]);

  return {
    filters,
    setFilters,
    questions,
    loading,
    page,
    setPage,
    totalQuestions,
    triggerFetch: () => setShouldFetch(true), // NEW
  };
}
