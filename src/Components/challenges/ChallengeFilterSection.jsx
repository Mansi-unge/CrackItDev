import React from "react";
import {
  FaChevronDown,
  FaChevronUp,
  FaSlidersH,
  FaTimes,
} from "react-icons/fa";
import useChallengeFilters from "../../Hooks/challenges/useChallengeFilters";
import {levelOptions , companyOptions } from "../Common/filterOptions";


const ChallengeFilterSection = ({ filters, setFilters }) => {
  const {
    isOpen,
    expanded,
    toggleDrawer,
    closeDrawer,
    toggleSection,
    toggleFilter,
    resetFilters,
  } = useChallengeFilters(filters, setFilters);

  const renderCheckboxes = (key, label, options) => (
    <div className="mb-4">
      <button
        onClick={() => toggleSection(key)}
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
          onClick={resetFilters}
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
      {/* Mobile Toggle */}
      <div className="md:hidden px-4 pt-2">
        <button
          onClick={toggleDrawer}
          className="flex items-center gap-2 text-indigo-700 font-semibold"
        >
          <FaSlidersH />
          Filter
        </button>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="fixed inset-0 bg-opacity-50 z-40 flex">
          <div className="bg-white w-3/4 max-w-xs p-4 overflow-y-auto">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-bold">Filters</h2>
              <button onClick={closeDrawer}>
                <FaTimes className="text-gray-500 hover:text-black" />
              </button>
            </div>
            {content}
          </div>
          <div className="flex-1" onClick={closeDrawer}></div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <aside className="hidden md:block w-64 h-screen sticky top-0 overflow-y-auto bg-gray-50">
        {content}
      </aside>
    </>
  );
};

export default ChallengeFilterSection;
