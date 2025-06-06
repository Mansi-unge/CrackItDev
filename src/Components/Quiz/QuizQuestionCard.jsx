import React from "react";
import AnswerOptions from "./AnswerOptions";
import ExplanationBox from "./ExplanationBox";

const QuizQuestionCard = ({
  question,
  selected,
  submitted,
  onSelect,
  onSubmit,
  toggleExplanation,
}) => {
  return (
    <div className="pb-8 border-b border-gray-300">
      <h2 className="text-xl font-semibold text-gray-800 mb-2">{question.title}</h2>

      <div className="flex gap-2 text-sm text-gray-600 flex-wrap mb-3">
        <span className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full">{question.level}</span>
        <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full">{question.tech}</span>
        {question.company.map((c, i) => (
          <span key={i} className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">{c}</span>
        ))}
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-[70%] space-y-2">
          <AnswerOptions
            questionId={question._id}
            options={question.options}
            selected={selected}
            submitted={submitted}
            correctOption={question.correctOption}
            onSelect={onSelect}
          />

          {!submitted && (
            <button
              onClick={() => onSubmit(question._id)}
              className="mt-3 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
            >
              Submit My Answer
            </button>
          )}

          {submitted && (
            <button
              onClick={() => toggleExplanation(question._id)}
              className="mt-3 px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition"
            >
              {submitted.showExplanation ? "Hide" : "View"} Explanation
            </button>
          )}
        </div>

        {submitted?.showExplanation && (
          <ExplanationBox explanation={submitted.explanation} />
        )}
      </div>
    </div>
  );
};

export default QuizQuestionCard
