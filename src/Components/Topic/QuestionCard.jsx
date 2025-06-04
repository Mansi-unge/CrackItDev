import React from "react";

function difficultyColor(level) {
  switch (level) {
    case "Beginner":
      return "border-green-400";
    case "Intermediate":
      return "border-yellow-400";
    case "Advanced":
      return "border-red-400";
    default:
      return "border-gray-300";
  }
}

export default function QuestionCard({
  question,
  expanded,
  onToggleExpand,
  bookmarked,
  onBookmark,
  onShare,
}) {
  return (
    <div
      className={`border-l-4 ${difficultyColor(
        question.level
      )} bg-white dark:bg-gray-800 rounded-md shadow-sm hover:shadow-md transform hover:scale-[1.02] transition duration-200 p-5 mb-6 cursor-pointer`}
      onClick={() => onToggleExpand(question.id)}
      id={`question-${question.id}`}
      aria-expanded={expanded}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onToggleExpand(question.id);
      }}
    >
      <div className="flex justify-between items-start">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
          {question.title}
        </h3>

        <div className="flex space-x-4">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onBookmark(question.id);
            }}
            title={bookmarked ? "Remove Bookmark" : "Bookmark"}
            className={`focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded ${
              bookmarked ? "text-indigo-900" : "text-indigo-600 hover:text-indigo-900"
            }`}
            aria-label="Bookmark question"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 fill-current"
              viewBox="0 0 24 24"
              stroke="none"
            >
              <path d="M6 4a2 2 0 0 0-2 2v16l8-5 8 5V6a2 2 0 0 0-2-2H6z" />
            </svg>
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onShare(question.id);
            }}
            title="Share"
            className="text-indigo-600 hover:text-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded"
            aria-label="Share question"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              <circle cx="18" cy="5" r="3" />
              <circle cx="6" cy="12" r="3" />
              <circle cx="18" cy="19" r="3" />
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
              <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
            </svg>
          </button>
        </div>
      </div>

      <p className="mt-3 text-gray-700 dark:text-gray-300">{question.answer}</p>

      {expanded && (
        <div className="mt-4 p-4 bg-indigo-50 dark:bg-indigo-900 rounded-md text-gray-800 dark:text-indigo-200 transition-all duration-300 ease-in-out">
          <p>{question.fullAnswer}</p>
        </div>
      )}

      <div className="mt-4 flex flex-wrap gap-2">
        {question.tags.map((tag) => (
          <span
            key={tag}
            className="inline-block bg-indigo-100 dark:bg-indigo-700 text-indigo-800 dark:text-indigo-200 text-xs font-semibold px-3 py-1 rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
