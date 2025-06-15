import { useState, useEffect, useCallback } from "react";
import axios from "axios";

const PAGE_SIZE = 15;

export default function useBrowseTheoryQuestions() {
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

  const buildQuery = () => {
    const query = [];
    Object.entries(filters).forEach(([key, value]) => {
      if (value.length) query.push(`${key}=${value.join(",")}`);
    });
    query.push(`page=${page}`, `pageSize=${PAGE_SIZE}`);
    return query.join("&");
  };

  const fetchQuestions = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`http://localhost:5000/api/theory/questions?${buildQuery()}`);
      const newQuestions = data.questions;

      setTotalQuestions(data.total);
      setQuestions(prev =>
        page === 1 ? newQuestions : [...prev, ...newQuestions]
      );
    } catch (error) {
      console.error("Error fetching questions:", error);
    } finally {
      setLoading(false);
    }
  }, [filters, page]);

  useEffect(() => {
    setPage(1);
  }, [filters]);

  useEffect(() => {
    fetchQuestions();
  }, [fetchQuestions]);

  return {
    filters,
    setFilters,
    questions,
    loading,
    page,
    setPage,
    totalQuestions,
  };
}
