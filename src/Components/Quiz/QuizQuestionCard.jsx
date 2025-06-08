import React from "react";
import AnswerOptions from "./AnswerOptions";
import ExplanationBox from "./ExplanationBox";
import { FaTimesCircle } from "react-icons/fa";
const QuizQuestionCard = ({
  question,
  selected,
  submitted,
  onSelect,
  onSubmit,
  toggleExplanation,
}) => {
  const isSubmitted = Boolean(submitted);
  const isCorrect = submitted?.isCorrect;
  const showExplanation = submitted?.showExplanation;

  return (
    <div className="pb-8 border-b border-gray-300">
      {/* Title */}
      <h2 className="text-xl font-semibold text-gray-800 mb-2">{question.title}</h2>

      {/* Tags */}
      <div className="flex gap-2 text-sm text-gray-600 flex-wrap mb-3">
        <span className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full">{question.level}</span>
        <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full">{question.tech}</span>
        {question.company.map((c, i) => (
          <span key={i} className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">{c}</span>
        ))}
      </div>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left Panel */}
        <div className="w-full md:w-[70%] space-y-2">
          <AnswerOptions
            questionId={question._id}
            options={question.options}
            selected={selected}
            submitted={submitted}
            correctOption={question.correctOption}
            onSelect={onSelect}
          />

          {/* Submit Button */}
          {!isSubmitted ? (
            <button
              onClick={() => onSubmit(question._id)}
              className="mt-3 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
            >
              Submit My Answer
            </button>
          ) : (
            <div className="mt-3 space-y-2">
              {/* Button Row */}
              <div className="flex gap-4">
                <button
                  disabled
                  className="px-4 py-2 bg-gray-300 text-gray-600 rounded cursor-not-allowed"
                >
                  Already Solved
                </button>
                <button
                  onClick={() => toggleExplanation(question._id)}
                  className="px-4 py-2 bg-green-300 text-green-700 font-medium rounded hover:bg-green-700 hover:text-white transition"
                >
                  {showExplanation ? "Hide" : "View"} Explanation
                </button>
                {/* Incorrect Message */}
                {!isCorrect && (
                  <p className="flex items-center text-md  font-medium gap-2">
                    <FaTimesCircle className="text-xl" />
                    Your answer <span className="font-semibold text-red-600">{selected}</span> is incorrect. 
                    Correct Answer:{" "}
                    <span className="font-semibold text-green-700">
                      {question.correctOption}
                    </span>
                  </p>
                )}
              </div>

            </div>
          )}
        </div>

        {/* Right Panel - Explanation */}
        {showExplanation && (
          <ExplanationBox explanation={submitted.explanation} />
        )}
      </div>
    </div>
  );
};

export default QuizQuestionCard;
