import React, { useState, useEffect } from "react";
import axios from "axios";
import FilterSection from "../Topic/Filters";


export default function Quiz() {
  const [filters, setFilters] = useState({
    tech: [],
    level: [],
    type: ["MCQ"],
    company: [],
  });

  const [questions, setQuestions] = useState([]);
  const [page, setPage] = useState(1);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const pageSize = 15;

  const fetchQuestions = async () => {
    try {
      const query = [];

      if (filters.tech.length) query.push(`tech=${filters.tech.join(",")}`);
      if (filters.level.length) query.push(`level=${filters.level.join(",")}`);
      if (filters.type.length) query.push(`type=${filters.type.join(",")}`);
      if (filters.company.length) query.push(`company=${filters.company.join(",")}`);
      query.push(`page=${page}`);
      query.push(`pageSize=${pageSize}`);

      const url = `http://localhost:5000/api/questions?${query.join("&")}`;
      const res = await axios.get(url);

      if (res.data && res.data.questions?.length) {
        setTotalQuestions(res.data.total);
        setQuestions((prev) =>
          page === 1 ? res.data.questions : [...prev, ...res.data.questions]
        );
      } else {
        setQuestions([]);
      }
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

  const handleAnswerSelect = (questionId, answer) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
  };

  const getAnswerStatus = (question) => {
    const selected = selectedAnswers[question._id];
    if (!selected) return null;
    return selected === question.answer ? "correct" : "incorrect";
  };

  return (
    <div className="md:flex">
      <FilterSection filters={filters} setFilters={setFilters} />

      <main className="flex-1 p-4 md:p-6 max-w-8xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center text-gray-800">
          Quiz - MCQ Questions
        </h1>

        {questions.length === 0 ? (
          <div className="text-center text-gray-500">No questions found.</div>
        ) : (
          <div className="space-y-6">
            {questions.map((q) => {
              const selected = selectedAnswers[q._id];
              const status = getAnswerStatus(q);

              return (
                <div
                  key={q._id}
                  className="p-4 border rounded shadow-sm bg-white space-y-2"
                >
                  <h2 className="text-lg font-semibold text-gray-800">
                    {q.title}
                  </h2>

                  <p className="text-sm text-gray-600">
                    <strong>Tech:</strong> {q.tech} &nbsp;|&nbsp;
                    <strong>Level:</strong> {q.level} &nbsp;|&nbsp;
                    <strong>Company:</strong> {q.company?.join(", ") || "N/A"}
                  </p>

                  <div className="flex flex-col gap-2 mt-2">
                    {q.options?.map((option, index) => {
                      const isCorrect = option === q.answer;
                      const isSelected = selected === option;
                      const showAnswer =
                        selected && (isCorrect || isSelected);

                      return (
                        <label
                          key={index}
                          className={`flex items-center gap-2 cursor-pointer px-2 py-1 rounded ${
                            showAnswer
                              ? isCorrect
                                ? "bg-green-100"
                                : "bg-red-100"
                              : ""
                          }`}
                        >
                          <input
                            type="radio"
                            name={`question-${q._id}`}
                            value={option}
                            checked={isSelected}
                            onChange={() => handleAnswerSelect(q._id, option)}
                          />
                          <span>{option}</span>
                        </label>
                      );
                    })}
                  </div>

                  {status && (
                    <div
                      className={`mt-2 text-sm font-medium ${
                        status === "correct"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {status === "correct"
                        ? "✅ Correct!"
                        : `❌ Incorrect. Correct answer: ${q.answer}`}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {questions.length > 0 && questions.length < totalQuestions && (
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
