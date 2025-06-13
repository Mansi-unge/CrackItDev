import { useEffect, useState } from "react";
import {
  fetchMCQProgress,
  fetchMCQQuestions,
  verifyMCQAnswer,
  saveMCQProgress,
} from "../services/mcqService";

export default function useMCQQuiz(token, filters, pageSize = 15) {
  const [questions, setQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submittedAnswers, setSubmittedAnswers] = useState({});
  const [points, setPoints] = useState(0);
  const [page, setPage] = useState(1);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token) fetchProgress();
  }, [token]);

  useEffect(() => {
    setPage(1);
  }, [filters]);

  useEffect(() => {
    if (token) fetchQuestions();
  }, [filters, page]);

  const fetchProgress = async () => {
    try {
      const { solvedMcqQuestions, points } = await fetchMCQProgress(token);
      const formatted = {};
      solvedMcqQuestions.forEach((q) => {
        formatted[q.questionId] = {
          selected: q.selectedOption,
          isCorrect: q.isCorrect,
          explanation: q.explanation,
          showExplanation: true,
        };
      });
      setSubmittedAnswers(formatted);
      setPoints(points);
    } catch (err) {
      console.error("Progress fetch failed:", err);
    }
  };

  const fetchQuestions = async () => {
    setLoading(true);
    try {
      const { questions: fetched, total } = await fetchMCQQuestions(filters, page, pageSize);
      setTotalQuestions(total);
      setQuestions((prev) => (page === 1 ? fetched : [...prev, ...fetched]));
    } catch (err) {
      console.error("Question fetch failed:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (qid, option) => {
    if (submittedAnswers[qid]) return;
    setSelectedAnswers((prev) => ({ ...prev, [qid]: option }));
  };

  const handleSubmitAnswer = async (qid) => {
    const selected = selectedAnswers[qid];
    if (!selected || submittedAnswers[qid]) return;

    try {
      const question = questions.find((q) => q._id === qid);
      const isCorrect = selected === question.correctOption;
      const explanation = await verifyMCQAnswer(qid, selected, token);

      await saveMCQProgress(qid, selected, isCorrect, explanation, token);

      const answerObj = {
        selected,
        correct: question.correctOption,
        isCorrect,
        explanation,
        showExplanation: false,
      };

      setSubmittedAnswers((prev) => ({ ...prev, [qid]: answerObj }));
      if (isCorrect) setPoints((prev) => prev + 1);
    } catch (err) {
      console.error("Answer submit failed:", err);
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

  return {
    questions,
    totalQuestions,
    loading,
    points,
    selectedAnswers,
    submittedAnswers,
    page,
    setPage,
    handleSelect,
    handleSubmitAnswer,
    toggleExplanation,
  };
}
