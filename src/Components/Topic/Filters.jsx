// src/components/Filters.jsx
import { useState } from "react";

const techOptions = ["JavaScript", "Python", "Java", "C++"];
const levelOptions = ["Easy", "Medium", "Hard"];
const typeOptions = ["Coding", "System Design"];
const companyOptions = ["Google", "Facebook", "Amazon"];

const FilterSection = ({ filters, setFilters }) => {
  const toggleFilter = (category, value) => {
    const currentValues = filters[category];
    if (currentValues.includes(value)) {
      setFilters({
        ...filters,
        [category]: currentValues.filter((v) => v !== value),x
      });
    } else {
      setFilters({
        ...filters,
        [category]: [...currentValues, value],
      });
    }
  };

  const renderCheckboxes = (category, options) =>
    options.map((option) => (
      <label key={option} className="mr-6 cursor-pointer select-none">
        <input
          type="checkbox"
          className="mr-1 accent-blue-600"
          checked={filters[category].includes(option)}
          onChange={() => toggleFilter(category, option)}
        />
        <span className="text-gray-700">{option}</span>
      </label>
    ));

  return (
    <div className="mb-6 p-4 bg-white rounded-md shadow-sm border border-gray-200">
      <div className="mb-3">
        <strong className="block mb-1 text-gray-800">Tech:</strong>
        <div>{renderCheckboxes("tech", techOptions)}</div>
      </div>
      <div className="mb-3">
        <strong className="block mb-1 text-gray-800">Level:</strong>
        <div>{renderCheckboxes("level", levelOptions)}</div>
      </div>
      <div className="mb-3">
        <strong className="block mb-1 text-gray-800">Type:</strong>
        <div>{renderCheckboxes("type", typeOptions)}</div>
      </div>
      <div>
        <strong className="block mb-1 text-gray-800">Company:</strong>
        <div>{renderCheckboxes("company", companyOptions)}</div>
      </div>
    </div>
  );
};

export default FilterSection;
