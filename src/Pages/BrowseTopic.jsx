import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import TheoryFilterSection from "../Components/Topic/TheoryFilters";
import QuestionCard from "../Components/Topic/QuestionCard";
import { FaSpinner } from "react-icons/fa";

const PAGE_SIZE = 15;

export default function BrowseTopic() {
  const [filters, setFilters] = useState({
    tech: [],
    level: [],
    type: ["Theory"],
    company: [],
  });
  const [questions, setQuestions] = useState([]);
  const [expandedId, setExpandedId] = useState(null);
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


  return (
    <div className="md:flex">
      <TheoryFilterSection filters={filters} setFilters={setFilters} />
      <main className="flex-1 p-4 md:p-6 max-w-8xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center text-gray-800">
          Browse Interview Questions
        </h1>

        {loading ? (
          <div className="flex flex-col items-center justify-center min-h-[40vh] text-blue-600 text-lg">
            <FaSpinner className="animate-spin text-3xl mb-2" />
            Loading ...
          </div>
        ) : questions.length === 0 ? (
          <p className="text-center text-gray-500">No questions found.</p>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {questions.map((q) => (
              <QuestionCard
                key={q._id}
                question={{
                  ...q,
                  id: q._id,
                  tags: [q.tech, q.type, q.level],
                }}
              />
            ))}
          </div>
        )}

        {!loading && questions.length < totalQuestions && (
          <div className="text-center mt-8">
            <button
              onClick={() => setPage((prev) => prev + 1)}
              className="px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors"
            >
              Show More
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
