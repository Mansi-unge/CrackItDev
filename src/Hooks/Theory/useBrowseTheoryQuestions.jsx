// useBrowseTheoryQuestions.js
import { useState, useEffect, useCallback } from "react";
import { fetchTheoryQuestions } from "../../services/Theory/theoryService";
import { toast } from "react-toastify";

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
  const [shouldFetch, setShouldFetch] = useState(!manual); // Only auto-fetch if not manual

  // Build dynamic query string
  const buildQuery = useCallback(() => {
    const query = [];
    Object.entries(filters).forEach(([key, value]) => {
      if (value.length) query.push(`${key}=${value.join(",")}`);
    });
    query.push(`page=${page}`, `pageSize=${PAGE_SIZE}`);
    return query.join("&");
  }, [filters, page]);

  // Load questions from backend
  const loadQuestions = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchTheoryQuestions(buildQuery());
      const newQuestions = data.questions;

      setTotalQuestions(data.total || 0);
      setQuestions((prev) => (page === 1 ? newQuestions : [...prev, ...newQuestions]));
    } catch (error) {
      console.error("Error fetching theory questions:", error);
      toast.error("Failed to load theory questions.");
    } finally {
      setLoading(false);
    }
  }, [buildQuery, page]);

  // Trigger load if allowed
  useEffect(() => {
    if (shouldFetch) {
      loadQuestions();
      setShouldFetch(false); // prevent duplicate fetch
    }
  }, [loadQuestions, shouldFetch]);

  // When filters change, reset to page 1 and trigger fresh fetch
  useEffect(() => {
  if (manual && page > 1) {
    setShouldFetch(true);
  }
}, [page, manual]);

useEffect(() => {
  setPage(1);
  setQuestions([]); // ✅ Clear old questions when filters change
  if (!manual) {
    setShouldFetch(true);
  }
}, [filters, manual]);

  return {
    filters,
    setFilters,
    questions,
    loading,
    page,
    setPage,
    totalQuestions,
    triggerFetch: () => setShouldFetch(true),
  };
}
