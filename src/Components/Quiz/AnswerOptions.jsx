import React from "react";
import clsx from "clsx";

const AnswerOptions = ({ questionId, options, selected, submitted, correctOption, onSelect }) => {
  return (
    <>
      {options.map((option, idx) => {
        const isSelected = selected === option;
        const isCorrectAnswer = submitted && option === correctOption;
        const isWrongAnswer = submitted && isSelected && selected !== correctOption;

        return (
          <label
            key={idx}
            className={clsx(
              "flex items-center gap-2 px-3 py-2 rounded-md border transition cursor-pointer ",
              isCorrectAnswer && "bg-green-100 border-green-500 text-green-700",
              isWrongAnswer && "bg-red-100 border-red-500 text-red-700",
              isSelected && !submitted && "bg-blue-100 border-blue-500 text-blue-700",
              !submitted && !isSelected && "hover:bg-gray-100 border-gray-300",
              submitted && !isCorrectAnswer && !isWrongAnswer && "border-gray-200"
            )}
          >
            <input
              type="radio"
              name={`question-${questionId}`}
              value={option}
              disabled={!!submitted}
              checked={isSelected}
              onChange={() => onSelect(questionId, option)}
            />
            <span>{option}</span>
          </label>
        );
      })}
    </>
  );
};

export default AnswerOptions;
