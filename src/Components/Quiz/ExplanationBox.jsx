import React from "react";

const ExplanationBox = ({ explanation }) => (
  <div className="w-full md:w-[30%] px-4 py-3 bg-blue-50 border border-blue-200 rounded-md text-sm text-gray-800 transition-all duration-500 ease-in-out">
    <strong className="block mb-1">Explanation:</strong>
    <p>{explanation}</p>
  </div>
);

export default ExplanationBox;