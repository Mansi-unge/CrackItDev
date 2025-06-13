import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import useMCQQuiz from "../Hooks/useMCQQuiz";

import MCQHeader from "../Components/Quiz/MCQHeader";
import QuizFilterSection from "../Components/Quiz/QuizFilterSection";
import QuestionList from "../Components/Quiz/QuestionList";
import QuizPageLayout from "../Components/Quiz/QuizPageLayout";

export default function Quiz() {
  const [filters, setFilters] = useState({
    tech: [],
    level: [],
    type: ["MCQ"],
    company: [],
  });

  const token = localStorage.getItem("token");
  if (!token) return <Navigate to="/login" replace />;

  const {
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
  } = useMCQQuiz(token, filters);

  return (
    <QuizPageLayout>
      <QuizFilterSection filters={filters} setFilters={setFilters} />
      <main className="flex-1 p-4 md:p-6 max-w-7xl mx-auto">
        <MCQHeader points={points} />
        <QuestionList
          loading={loading}
          questions={questions}
          totalQuestions={totalQuestions}
          selectedAnswers={selectedAnswers}
          submittedAnswers={submittedAnswers}
          onSelect={handleSelect}
          onSubmit={handleSubmitAnswer}
          toggleExplanation={toggleExplanation}
          onShowMore={() => setPage(page + 1)}
        />
      </main>
    </QuizPageLayout>
  );
}
