import { useState } from "react";

const useTheoryFilters = (filters, setFilters) => {
  const [isOpen, setIsOpen] = useState(false);
  const [expanded, setExpanded] = useState({
    tech: true,
    level: true,
    company: true,
  });

  const toggleSection = (key) => {
    setExpanded((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleFilter = (key, value) => {
    setFilters((prevFilters) => {
      const updated = prevFilters[key].includes(value)
        ? prevFilters[key].filter((item) => item !== value)
        : [...prevFilters[key], value];
      return { ...prevFilters, [key]: updated };
    });
  };

  const resetFilters = () => {
    setFilters({
      tech: [],
      level: [],
      company: [],
    });
  };

  return {
    isOpen,
    setIsOpen,
    expanded,
    toggleSection,
    toggleFilter,
    resetFilters,
  };
};

export default useTheoryFilters;
