import { useState } from "react";

const useChallengeFilters = (filters, setFilters) => {
  const [isOpen, setIsOpen] = useState(false);
  const [expanded, setExpanded] = useState({
    level: true,
    company: true,
  });

  const toggleDrawer = () => setIsOpen(true);
  const closeDrawer = () => setIsOpen(false);

  const toggleSection = (key) => {
    setExpanded((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleFilter = (key, value) => {
    const currentSet = new Set(filters[key]);
    currentSet.has(value) ? currentSet.delete(value) : currentSet.add(value);
    setFilters({ ...filters, [key]: Array.from(currentSet) });
  };

  const resetFilters = () => {
    setFilters({
      tech: [filters.tech[0]],
      level: [],
      type: ["Coding"],
      company: [],
    });
  };

  return {
    isOpen,
    expanded,
    toggleDrawer,
    closeDrawer,
    toggleSection,
    toggleFilter,
    resetFilters,
  };
};

export default useChallengeFilters;
