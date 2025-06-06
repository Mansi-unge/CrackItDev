import React, { useState, useEffect } from "react";
import axios from "axios";
import QuizFilterSection from "../Components/Quiz/QuizFilterSection";
import { FaSpinner } from "react-icons/fa";
import QuizQuestionCard from "../Components/Quiz/QuizQuestionCard";

export default function Quiz() {
  const [filters, setFilters] = useState({
    tech: [],
    level: [],
    type: ["MCQ"],
    company: [],
  });

  const [questions, setQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submittedAnswers, setSubmittedAnswers] = useState({});
  const [page, setPage] = useState(1);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [loading, setLoading] = useState(false);
  const pageSize = 15;

  const fetchQuestions = async () => {
    try {
      setLoading(true);
      const query = [];

      if (filters.tech.length) query.push(`tech=${filters.tech.join(",")}`);
      if (filters.level.length) query.push(`level=${filters.level.join(",")}`);
      if (filters.type.length) query.push(`type=${filters.type.join(",")}`);
      if (filters.company.length) query.push(`company=${filters.company.join(",")}`);
      query.push(`page=${page}`);
      query.push(`pageSize=${pageSize}`);

      const url = `http://localhost:5000/api/questions?${query.join("&")}`;
      const res = await axios.get(url);

      const fetchedQuestions = res.data?.questions || [];
      setTotalQuestions(res.data?.total || 0);
      setQuestions((prev) => (page === 1 ? fetchedQuestions : [...prev, ...fetchedQuestions]));
    } catch (error) {
      console.error("Error fetching questions:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setPage(1); // Reset to page 1 when filters change
  }, [filters]);

  useEffect(() => {
    fetchQuestions();
  }, [page, filters]);

  const handleSelect = (qid, option) => {
    if (submittedAnswers[qid]) return;
    setSelectedAnswers((prev) => ({ ...prev, [qid]: option }));
  };

  const handleSubmitAnswer = async (qid) => {
    const selected = selectedAnswers[qid];
    if (!selected) return;

    try {
      const res = await axios.post("http://localhost:5000/api/questions/verify", {
        questionId: qid,
        selectedOption: selected,
      });

      const question = questions.find((q) => q._id === qid);

      setSubmittedAnswers((prev) => ({
        ...prev,
        [qid]: {
          selected,
          correct: question.correctOption,
          isCorrect: selected === question.correctOption,
          explanation: res.data?.answerExplanation || "No explanation provided.",
          showExplanation: false,
        },
      }));
    } catch (error) {
      console.error("Error submitting answer:", error);
    }
  };

  const toggleExplanation = (qid) => {
    setSubmittedAnswers((prev) => ({
      ...prev,
      [qid]: {
        ...prev[qid],
        showExplanation: !prev[qid].showExplanation,
      },
    }));
  };

  return (
    <div className="md:flex">
      <QuizFilterSection filters={filters} setFilters={setFilters} />

      <main className="flex-1 p-4 md:p-6 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Quiz - MCQ Questions
        </h1>

        {loading ? (
          <div className="flex flex-col items-center justify-center min-h-[40vh] text-blue-600 text-lg">
            <FaSpinner className="animate-spin text-3xl mb-2" />
            Loading ...
          </div>
        ) : questions.length === 0 ? (
          <div className="text-center text-gray-500">
            <p>No questions found. Adjust filters to find relevant MCQs.</p>
          </div>
        ) : (
          <div className="space-y-10">
            {questions.map((q) => (
              <QuizQuestionCard
                key={q._id}
                question={q}
                selected={selectedAnswers[q._id]}
                submitted={submittedAnswers[q._id]}
                onSelect={handleSelect}
                onSubmit={handleSubmitAnswer}
                toggleExplanation={toggleExplanation}
              />
            ))}
          </div>
        )}

        {!loading && questions.length > 0 && questions.length < totalQuestions && (
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
