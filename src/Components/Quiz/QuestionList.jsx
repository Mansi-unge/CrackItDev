import QuizQuestionCard from "./QuizQuestionCard";
import { FaSpinner } from "react-icons/fa";

export default function QuestionList({
  loading,
  questions,
  totalQuestions,
  submittedAnswers,
  selectedAnswers,
  onSelect,
  onSubmit,
  toggleExplanation,
  onShowMore
}) {
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[40vh] text-blue-600 text-lg">
        <FaSpinner className="animate-spin text-3xl mb-2" />
        Loading ...
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="text-center text-gray-500">
        <p>No questions found. Adjust filters to find relevant MCQs.</p>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-10">
        {questions.map((q) => (
          <QuizQuestionCard
            key={q._id}
            question={q}
            selected={submittedAnswers[q._id]?.selected ?? selectedAnswers[q._id]}
            submitted={submittedAnswers[q._id]}
            onSelect={onSelect}
            onSubmit={onSubmit}
            toggleExplanation={toggleExplanation}
          />
        ))}
      </div>

      {questions.length < totalQuestions && (
        <div className="text-center mt-8">
          <button
            onClick={onShowMore}
            className="px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors"
          >
            Show More
          </button>
        </div>
      )}
    </>
  );
}