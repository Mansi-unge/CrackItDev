import React from "react";
import { FaRegBookmark, FaBookmark, FaShareAlt } from "react-icons/fa";

const QuestionCard = ({
  question
}) => {
  const { id, title, fullAnswer, tech, level, company = [] } = question;

  return (
    <div id={`question-${id}`} className="py-4 px-6 border-b-2 border-gray-400">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div className="flex-1">
          <h2
            className="text-base sm:text-lg font-semibold cursor-pointer text-gray-800 hover:text-indigo-600 transition-colors"
          >
            {title}
          </h2>

            <p className="mt-2 text-gray-700 text-sm leading-relaxed whitespace-pre-line">
              {fullAnswer}
            </p>

          <div className="flex flex-wrap mt-2 gap-2">
            <span className="bg-indigo-100 text-indigo-700 text-xs font-medium px-3 py-1 rounded-full">
              {tech}
            </span>
            <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-3 py-1 rounded-full">
              {level}
            </span>
            {company.map((c, i) => (
              <span
                key={i}
                className="bg-green-100 text-green-700 text-xs font-medium px-3 py-1 rounded-full"
              >
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
