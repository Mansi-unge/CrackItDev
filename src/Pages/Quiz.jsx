import React, { useState, useEffect } from "react";
import axios from "axios";
import FilterSection from "../Components/Topic/Filters";

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
        setQuestions(page === 1 ? res.data.questions : [...questions, ...res.data.questions]);
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

  const handleSelect = (qid, option) => {
    if (submittedAnswers[qid]) return; // don't allow if already submitted
    setSelectedAnswers((prev) => ({ ...prev, [qid]: option }));
  };

  const handleSubmitAnswer = async (qid) => {
    const question = questions.find((q) => q._id === qid);
    const selected = selectedAnswers[qid];

    if (!question || !selected) return;

    // Optionally, you can make API call here to track user submissions

    setSubmittedAnswers((prev) => ({
      ...prev,
      [qid]: {
        selected,
        correct: question.correctOption,
        isCorrect: selected === question.correctOption,
      },
    }));
  };

  return (
    <div className="md:flex">
      <FilterSection filters={filters} setFilters={setFilters} />

      <main className="flex-1 p-4 md:p-6 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Quiz - MCQ Questions
        </h1>

        {questions.length === 0 ? (
          <div className="text-center text-gray-500">
            <p>No questions found. Showing a sample question for testing UI.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {questions.map((q) => (
              <div key={q._id} className="p-5 border rounded bg-white shadow-md space-y-2">
                <h2 className="text-lg font-semibold text-gray-800">{q.title}</h2>

                <div className="flex gap-2 text-sm text-gray-600 flex-wrap">
                  <span className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full">
                    {q.level}
                  </span>
                  <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full">
                    {q.tech}
                  </span>
                  {q.company.map((c, i) => (
                    <span
                      key={i}
                      className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full"
                    >
                      {c}
                    </span>
                  ))}
                </div>

                <div className="flex flex-col gap-2 mt-3">
                  {q.options.map((option, idx) => {
                    const isSubmitted = !!submittedAnswers[q._id];
                    const isCorrect = submittedAnswers[q._id]?.correct === option;
                    const isSelected = selectedAnswers[q._id] === option;

                    return (
                      <label
                        key={idx}
                        className={`flex items-center gap-2 p-2 rounded border cursor-pointer
                          ${isSubmitted && isCorrect ? "bg-green-100 border-green-500" : ""}
                          ${isSubmitted && isSelected && !isCorrect ? "bg-red-100 border-red-500" : ""}
                          ${!isSubmitted ? "hover:bg-gray-100" : ""}
                        `}
                      >
                        <input
                          type="radio"
                          name={`question-${q._id}`}
                          value={option}
                          disabled={isSubmitted}
                          checked={isSelected}
                          onChange={() => handleSelect(q._id, option)}
                        />
                        <span>{option}</span>
                      </label>
                    );
                  })}
                </div>

                {!submittedAnswers[q._id] && (
                  <button
                    onClick={() => handleSubmitAnswer(q._id)}
                    className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
                  >
                    Submit My Answer
                  </button>
                )}
              </div>
            ))}
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
