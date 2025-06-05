import React from "react";
import { FaRegBookmark, FaBookmark, FaShareAlt } from "react-icons/fa";

const QuestionCard = ({
  question,
  expanded,
  onToggleExpand,
  onBookmark,
  onShare,
  isBookmarked,
}) => {
  return (
    <div
      id={`question-${question.id}`}
      className="p-4 border-b border-gray-200"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div className="flex-1">
          <h2
            className="text-base sm:text-lg font-semibold cursor-pointer text-gray-800 hover:text-indigo-600 transition-colors"
            onClick={() => onToggleExpand(question.id)}
          >
            {question.title}
          </h2>

          {expanded && (
            <p className="mt-2 text-gray-700 text-sm leading-relaxed whitespace-pre-line">
              {question.fullAnswer}
            </p>
          )}

          <div className="flex flex-wrap mt-2 gap-2">
            <span className="bg-indigo-100 text-indigo-700 text-xs font-medium px-3 py-1 rounded-full">
              {question.tech}
            </span>
            <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-3 py-1 rounded-full">
              {question.level}
            </span>
            {question.company.map((c, i) => (
              <span
                key={i}
                className="bg-green-100 text-green-700 text-xs font-medium px-3 py-1 rounded-full"
              >
                {c}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-row sm:flex-col gap-3 ml-0 sm:ml-6 mt-4 sm:mt-0 items-center">
          <button
            onClick={() => onBookmark(question.id)}
            className="hover:scale-110 transition-transform"
          >
            {isBookmarked ? (
              <FaBookmark className="text-indigo-600 text-lg" />
            ) : (
              <FaRegBookmark className="text-gray-400 hover:text-indigo-600 text-lg" />
            )}
          </button>
          <button
            onClick={() => onShare(question.id)}
            className="hover:scale-110 transition-transform"
          >
            <FaShareAlt className="text-gray-400 hover:text-indigo-600 text-lg" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
