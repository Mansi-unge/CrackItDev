import React from "react";
import {
  FaChevronDown,
  FaChevronUp,
  FaSlidersH,
  FaTimes,
} from "react-icons/fa";

import useTheoryFilters from "../../Hooks/Theory/useTheoryFilters";
import {
  techOptions,
  levelOptions,
  companyOptions,
} from "../Common/filterOptions";

export default function TheoryFilterSection({ filters, setFilters }) {
  const {
    isOpen,
    setIsOpen,
    expanded,
    toggleFilter,
    toggleSection,
    resetFilters,
  } = useTheoryFilters(filters, setFilters);

 const renderOptions = (key, label, options) => (
     <div className="mb-4">
       <button
         onClick={() => setExpanded((prev) => ({ ...prev, [key]: !prev[key] }))}
         className="flex justify-between items-center w-full font-semibold text-left"
       >
         <span>{label}</span>
         {expanded[key] ? <FaChevronUp /> : <FaChevronDown />}
       </button>
       {expanded[key] && (
         <div className="mt-2 flex flex-col space-y-1">
           {options.map((option) => {
             const isSelected = filters[key].includes(option);
             return (
               <span
                 key={option}
                 onClick={() => toggleFilter(key, option)}
                 className={`cursor-pointer inline-flex items-center space-x-2 text-md transition-colors ${isSelected ? "text-indigo-600 font-semibold" : "text-gray-800"
                   } hover:text-indigo-500`}
               >
                 <span>{option}</span>
               </span>
             );
           })}
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
         {renderOptions("tech", "Tech Stack", techOptions)}
            {renderOptions("level", "Difficulty", levelOptions)}
            {renderOptions("company", "Company", companyOptions)}
    </div>
  );

  return (
    <>
      {/* Mobile Toggle */}
      <div className="md:hidden px-4 pt-2">
        <button
          onClick={() => setIsOpen(true)}
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
              <button onClick={() => setIsOpen(false)}>
                <FaTimes className="text-gray-500 hover:text-black" />
              </button>
            </div>
            {content}
          </div>
          <div className="flex-1" onClick={() => setIsOpen(false)}></div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <aside className="hidden md:block w-64 h-screen sticky top-0 overflow-y-auto bg-gray-50">
        {content}
      </aside>
    </>
  );
}
