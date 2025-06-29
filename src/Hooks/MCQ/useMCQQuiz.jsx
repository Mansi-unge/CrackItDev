import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  fetchMCQProgress,
  fetchMCQQuestions,
  verifyMCQAnswer,
  saveMCQProgress,
  fetchSolvedMCQQuestions, // 👈 new service method
} from "../../services/MCQ/mcqService";

export default function useMCQQuiz(token, filters, pageSize = 15) {
  const [questions, setQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submittedAnswers, setSubmittedAnswers] = useState({});
  const [points, setPoints] = useState(0);
  const [page, setPage] = useState(1);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [loading, setLoading] = useState(false);
  const [showSolved, setShowSolved] = useState(false);

  useEffect(() => {
    if (token) fetchProgress();
  }, [token]);

  useEffect(() => {
    setPage(1);
  }, [filters]);

  useEffect(() => {
    if (token) fetchQuestions();
  }, [filters, page, showSolved]);

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
      toast.error("Failed to load MCQ progress.");
    }
  };

  const fetchQuestions = async () => {
    setLoading(true);
    try {
      if (showSolved) {
        const solvedIds = Object.keys(submittedAnswers);
        const { questions } = await fetchSolvedMCQQuestions(solvedIds, token);
        setQuestions(questions || []);
        setTotalQuestions(questions?.length || 0);
      } else {
        const { questions: fetched, total } = await fetchMCQQuestions(
          filters,
          page,
          pageSize
        );
        setQuestions((prev) => (page === 1 ? fetched : [...prev, ...fetched]));
        setTotalQuestions(total);
      }
    } catch (err) {
      console.error("Question fetch failed:", err);
      toast.error("Failed to load MCQ questions.");
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

      await saveMCQProgress(
        qid,
        selected,
        isCorrect,
        explanation,
        token,
        question.techstack,
        question.topic
      );

      const answerObj = {
        selected,
        correct: question.correctOption,
        isCorrect,
        explanation,
        showExplanation: false,
      };

      setSubmittedAnswers((prev) => ({ ...prev, [qid]: answerObj }));
      if (isCorrect) {
        setPoints((prev) => prev + 1);
        toast.success("Correct answer!");
      } else {
        toast.info("Incorrect answer. See explanation.");
      }
    } catch (err) {
      console.error("Answer submit failed:", err);
      toast.error("Failed to submit answer.");
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

  const filteredQuestions = questions.filter((q) =>
    showSolved ? submittedAnswers[q._id] : !submittedAnswers[q._id]
  );

  return {
    questions: filteredQuestions,
    totalQuestions,
    loading,
    points,
    selectedAnswers,
    submittedAnswers,
    page,
    setPage,
    showSolved,
    setShowSolved,
    handleSelect,
    handleSubmitAnswer,
    toggleExplanation,
  };
}
