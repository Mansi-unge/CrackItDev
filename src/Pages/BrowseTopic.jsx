// BrowseTopic.jsx
import React, { useEffect } from "react";
import { FaSpinner } from "react-icons/fa";
import { useSearchParams } from "react-router-dom";
import useBrowseTheoryQuestions from "../Hooks/Theory/useBrowseTheoryQuestions";
import TheoryFilterSection from "../Components/Topic/TheoryFilters";
import QuestionCard from "../Components/Topic/QuestionCard";

export default function BrowseTopic() {
  const [searchParams] = useSearchParams();

  const {
    filters,
    setFilters,
    questions,
    loading,
    page,
    setPage,
    totalQuestions,
    triggerFetch,
  } = useBrowseTheoryQuestions({ manual: true }); // manual fetch

  useEffect(() => {
    const techParam = searchParams.get("tech");
    const typeParam = searchParams.get("type");

    setFilters({
      tech: techParam ? [techParam] : [],
      type: typeParam ? [typeParam] : ["Theory"],
      level: [],
      company: [],
    });

    triggerFetch(); // after setting filters
  }, [searchParams]);

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
