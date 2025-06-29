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
  onShowMore,
  showSolved,
  setShowSolved
}) {
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[40vh] text-blue-600 text-lg">
        <FaSpinner className="animate-spin text-6xl mt-40" />
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="text-center text-gray-500">
        <p>No {showSolved ? "solved" : "unsolved"} questions found.</p>
      </div>
    );
  }

  return (
    <>
      {/* Toggle Buttons */}
      <div className="flex justify-center gap-4 my-6">
        <button
          onClick={() => setShowSolved(false)}
          className={`px-4 py-2 rounded ${
            !showSolved ? "bg-indigo-600 text-white" : "bg-gray-200 text-gray-700"
          }`}
        >
          Unsolved Questions
        </button>
        <button
          onClick={() => setShowSolved(true)}
          className={`px-4 py-2 rounded ${
            showSolved ? "bg-green-600 text-white" : "bg-gray-200 text-gray-700"
          }`}
        >
        Solved Questions
        </button>
      </div>

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

      {!showSolved && questions.length < totalQuestions && (
        <div className="text-center mt-8">
          <button
            onClick={onShowMore}
            className="px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors"
          >
            Show More
          </button>
        </div>
      )}
      {showSolved && questions.length === 0 && (
  <div className="text-center text-gray-500 mt-4">
    <p>You haven’t solved any questions yet. Solve some first!</p>
  </div>
)}
    </>
  );
}
