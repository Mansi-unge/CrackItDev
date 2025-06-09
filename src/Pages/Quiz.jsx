import React, { useState, useEffect } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom"; // <-- import Navigate here
import QuizFilterSection from "../Components/Quiz/QuizFilterSection";
import { FaSpinner } from "react-icons/fa";
import QuizQuestionCard from "../Components/Quiz/QuizQuestionCard";
import { toast } from "react-toastify";

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
  const [solvedMcqs, setSolvedMcqs] = useState({});
  const [page, setPage] = useState(1);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [loading, setLoading] = useState(false);
  const [points, setPoints] = useState(0);

  const pageSize = 15;

  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // 🔄 Fetch User Progress
  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/progress", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const userData = res.data;

        const progress = userData?.solvedMcqQuestions || [];
        const formatted = {};
        progress.forEach((q) => {
          formatted[q.questionId] = {
            selected: q.selectedOption,
            isCorrect: q.isCorrect,
            explanation: q.explanation || "No explanation available.",
            showExplanation: true,
          };
        });

        setSubmittedAnswers(formatted);
        setSolvedMcqs(formatted);
        setPoints(userData.points?.mcq || 0);
      } catch (err) {
        console.error("Failed to fetch MCQ progress", err);
      }
    };

    fetchProgress();
  }, [token]);

  // 🔄 Fetch Questions
  useEffect(() => {
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

        const fetched = res.data?.questions || [];
        setTotalQuestions(res.data?.total || 0);
        setQuestions((prev) => (page === 1 ? fetched : [...prev, ...fetched]));
      } catch (error) {
        console.error("Error fetching questions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [filters, page]);

  // 🔁 Reset to Page 1 when filters change
  useEffect(() => {
    setPage(1);
  }, [filters]);

  // ✅ Handle Option Select
  const handleSelect = (qid, option) => {
    if (submittedAnswers[qid]) return; // Prevent changing already submitted
    setSelectedAnswers((prev) => ({ ...prev, [qid]: option }));
  };

  // ✅ Handle Submit
  const handleSubmitAnswer = async (qid) => {
    const selected = selectedAnswers[qid];
    if (!selected || submittedAnswers[qid]) return;

    try {
      // 1. Verify
      const res = await axios.post(
        "http://localhost:5000/api/mcq/verify",
        { questionId: qid, selectedOption: selected },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const question = questions.find((q) => q._id === qid);
      const isCorrect = selected === question.correctOption;

      const explanation = res.data?.answerExplanation || "No explanation provided.";

      // 2. Save Progress
      await axios.post(
        "http://localhost:5000/api/mcq/save",
        { questionId: qid, selectedOption: selected, isCorrect, explanation },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // 3. Update UI
      const answerObj = {
        selected,
        correct: question.correctOption,
        isCorrect,
        explanation,
        showExplanation: true,
      };

      setSubmittedAnswers((prev) => ({ ...prev, [qid]: answerObj }));
      setSolvedMcqs((prev) => ({ ...prev, [qid]: answerObj }));
      if (isCorrect) {
        setPoints((prev) => prev + 1);
      }

      if (isCorrect) {
        toast.success("Correct Answer 🎉");
      } else {
        toast.error("Wrong Answer ❌");
      }
    } catch (error) {
      console.error("Error submitting answer or saving progress:", error);
      if (error.response?.data?.message === "Already solved") {
        alert("You've already solved this question!");
      }
    }
  };

  // 👁️ Toggle Explanation
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

      <main className="flex-1 p-4 md:p-6 max-w-7xl mx-auto ">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Quiz - MCQ Questions
        </h1>

        <div className="mb-6 text-center text-lg font-semibold text-indigo-700">
          Your MCQ Points: {points}
        </div>

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
                selected={
                  submittedAnswers[q._id]?.selected ?? selectedAnswers[q._id]
                }
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
