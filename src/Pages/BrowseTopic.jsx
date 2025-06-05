import React, { useState, useEffect } from "react";
import axios from "axios";
import FilterSection from "../Components/Topic/Filters";
import QuestionCard from "../Components/Topic/QuestionCard";

export default function BrowseTopic() {
  const [filters, setFilters] = useState({
    tech: [],
    level: [],
    type: [],
    company: [],
  });
  const [questions, setQuestions] = useState([]);
  const [expandedId, setExpandedId] = useState(null);
  const [page, setPage] = useState(1);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [bookmarkedQuestions, setBookmarkedQuestions] = useState([]);
  const pageSize = 15;

  const fetchQuestions = async () => {
    try {
      const query = [];

      if (filters.tech.length) query.push(`tech=${filters.tech.join(",")}`);
      if (filters.level.length) query.push(`level=${filters.level.join(",")}`);
      if (filters.type.length) query.push(`type=${filters.type.join(",")}`);
      if (filters.company.length)
        query.push(`company=${filters.company.join(",")}`);

      query.push(`page=${page}`);
      query.push(`pageSize=${pageSize}`);

      const res = await axios.get(
        `http://localhost:5000/api/questions?${query.join("&")}`
      );
      const newQuestions = res.data.questions;
      setTotalQuestions(res.data.total);

      setQuestions((prev) =>
        page === 1 ? newQuestions : [...prev, ...newQuestions]
      );
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  useEffect(() => {
    setPage(1);
  }, [filters]);

  useEffect(() => {
    fetchQuestions();
  }, [filters, page]);

  const handleBookmark = (id) => {
    setBookmarkedQuestions((prev) =>
      prev.includes(id) ? prev.filter((q) => q !== id) : [id, ...prev]
    );
  };

  const handleShare = (id) => {
    const shareURL = window.location.href + `#question-${id}`;
    navigator.clipboard.writeText(shareURL);
    alert("Link copied to clipboard!");
  };

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const sortedQuestions = [
    ...questions.filter((q) => bookmarkedQuestions.includes(q._id)),
    ...questions.filter((q) => !bookmarkedQuestions.includes(q._id)),
  ];

  return (
    <div className="md:flex">
      <FilterSection filters={filters} setFilters={setFilters} />
      <main className="flex-1 p-4 md:p-6 max-w-8xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center text-gray-800">
          Browse Interview Questions
        </h1>

        {sortedQuestions.length === 0 ? (
          <p className="text-center text-gray-500">No questions found.</p>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {sortedQuestions.map((q) => (
              <QuestionCard
                key={q._id}
                question={{
                  ...q,
                  id: q._id,
                  tags: [q.tech, q.type, q.level],
                }}
                expanded={expandedId === q._id}
                onToggleExpand={toggleExpand}
                onBookmark={handleBookmark}
                onShare={handleShare}
                isBookmarked={bookmarkedQuestions.includes(q._id)}
              />
            ))}
          </div>
        )}

        {sortedQuestions.length < totalQuestions && (
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
