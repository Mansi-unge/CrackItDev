import { useState } from "react";

export const useQuizFilter = (filters, setFilters) => {
  const [isOpen, setIsOpen] = useState(false);
  const [expanded, setExpanded] = useState({
    tech: true,
    level: true,
    type: true,
    company: true,
  });

  const toggleFilter = (key, value) => {
    const currentSet = new Set(filters[key]);
    currentSet.has(value) ? currentSet.delete(value) : currentSet.add(value);
    setFilters({ ...filters, [key]: Array.from(currentSet) });
  };

  const resetFilters = () => {
    setFilters({ tech: [], level: [], type: ["MCQ"], company: [] });
  };

  return {
    isOpen,
    setIsOpen,
    expanded,
    setExpanded,
    toggleFilter,
    resetFilters,
  };
};
