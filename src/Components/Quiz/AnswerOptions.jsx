import React from "react";

const AnswerOptions = ({ questionId, options, selected, submitted, correctOption, onSelect }) => {
  return (
    <>
      {options.map((option, idx) => {
        const isCorrect = submitted?.correct === option;
        const isSelected = selected === option;

        return (
          <label
            key={idx}
            className={`flex items-center gap-2 px-3 py-2 rounded-md border
              ${submitted && isCorrect ? "bg-green-100 border-green-400" : ""}
              ${submitted && isSelected && !isCorrect ? "bg-red-100 border-red-400" : ""}
              ${!submitted ? "hover:bg-gray-100 border-gray-300" : "border-gray-200"}
              transition cursor-pointer`}
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
