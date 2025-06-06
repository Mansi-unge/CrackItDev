import React, { useState } from "react";
import {
  FaChevronDown,
  FaChevronUp,
  FaSlidersH,
  FaTimes,
} from "react-icons/fa";

const levelOptions = ["Beginner", "Intermediate", "Advanced"];
const companyOptions = ["Google", "Amazon", "Microsoft", "Meta", "Facebook"];

const ChallengeFilterSection = ({ filters, setFilters }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [expanded, setExpanded] = useState({
    level: true,
    company: true,
  });

  const toggleFilter = (key, value) => {
    const currentSet = new Set(filters[key]);
    currentSet.has(value) ? currentSet.delete(value) : currentSet.add(value);
    setFilters({ ...filters, [key]: Array.from(currentSet) });
  };

  const renderCheckboxes = (key, label, options) => (
    <div className="mb-4">
      <button
        onClick={() => setExpanded((prev) => ({ ...prev, [key]: !prev[key] }))}
        className="flex justify-between items-center w-full font-semibold text-left"
      >
        <span>{label}</span>
        {expanded[key] ? <FaChevronUp /> : <FaChevronDown />}
      </button>
      {expanded[key] && (
        <div className="mt-2 flex flex-col max-h-48 overflow-y-auto space-y-1">
          {options.map((option) => (
            <label key={option} className="inline-flex items-center space-x-2">
              <input
                type="checkbox"
                checked={filters[key].includes(option)}
                onChange={() => toggleFilter(key, option)}
                className="form-checkbox text-indigo-600"
              />
              <span className="text-sm">{option}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );

  const content = (
    <div className="p-4 space-y-4 w-full md:w-60">
      <div className="flex justify-end items-center">
        <button
          onClick={() =>
            setFilters({ tech: [filters.tech[0]], level: [], type: ["Coding"], company: [] })
          }
          className="text-red-600 text-md hover:underline"
        >
          Reset All
        </button>
      </div>
      {renderCheckboxes("level", "Difficulty", levelOptions)}
      {renderCheckboxes("company", "Company", companyOptions)}
    </div>
  );

  return (
    <>
      {/* Mobile Drawer Toggle */}
      <div className="md:hidden px-4 pt-2">
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 text-indigo-700 font-semibold"
        >
          <FaSlidersH />
          Filter
        </button>
      </div>

      {/* Drawer for Mobile */}
      {isOpen && (
        <div className="fixed inset-0 bg-opacity-50 z-40 flex">
          <div className="bg-white w-3/4 max-w-xs p-4 overflow-y-auto">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-bold">Filters</h2>
              <button onClick={() => setIsOpen(false)}>
                <FaTimes className="text-gray-500 hover:text-black" />
              </button>
            </div>
            {content}
          </div>
          <div className="flex-1" onClick={() => setIsOpen(false)}></div>
        </div>
      )}

      {/* Sidebar for Desktop */}
      <aside className="hidden md:block w-64 h-screen sticky top-0 overflow-y-auto bg-gray-50">
        {content}
      </aside>
    </>
  );
};

export default ChallengeFilterSection;
