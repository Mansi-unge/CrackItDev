import React, { useState, useEffect } from "react";

// Dummy questions array with tech, level, type etc.
const dummyQuestions = [
  {
    id: 1,
    title: "What is HTML?",
    answer: "HTML is a markup language for webpages.",
    fullAnswer:
      "HTML stands for HyperText Markup Language. It structures web page content.",
    tech: "HTML",
    level: "Beginner",
    type: "Theory",
    tags: ["HTML", "Theory", "Beginner"],
    company: ["Google", "Microsoft"],
  },
  {
    id: 2,
    title: "What is closure in JavaScript?",
    answer:
      "Closure allows a function to access variables from an enclosing scope.",
    fullAnswer:
      "A closure is a function having access to the parent scope, even after the parent function has closed.",
    tech: "JavaScript",
    level: "Advanced",
    type: "Theory",
    tags: ["JavaScript", "Closure", "Advanced"],
    company: ["Amazon", "Meta"],
  },
  {
    id: 3,
    title: "Explain REST API",
    answer: "REST API is an architectural style for networked applications.",
    fullAnswer:
      "REST (Representational State Transfer) defines a set of constraints to create web services.",
    tech: "API",
    level: "Intermediate",
    type: "Theory",
    tags: ["API", "REST", "Intermediate"],
    company: ["Facebook", "Google"],
  },
  {
    id: 4,
    title: "What is useState in React?",
    answer: "useState is a React hook for state management in functional components.",
    fullAnswer:
      "useState returns a stateful value and a function to update it in React functional components.",
    tech: "React",
    level: "Beginner",
    type: "Theory",
    tags: ["React", "Hooks", "Beginner"],
    company: ["Microsoft"],
  },
  {
    id: 5,
    title: "What is MongoDB?",
    answer: "MongoDB is a NoSQL document database.",
    fullAnswer:
      "MongoDB stores data in flexible JSON-like documents, making it scalable and fast.",
    tech: "MongoDB",
    level: "Beginner",
    type: "Theory",
    tags: ["MongoDB", "NoSQL", "Beginner"],
    company: ["Amazon"],
  },
  // Add more...
];

// Options for filters
const techOptions = [
  "HTML",
  "CSS",
  "JavaScript",
  "React",
  "Node.js",
  "MongoDB",
  "SQL",
  "Java",
  "DSA",
  "Git",
  "Python",
  "DevOps",
];

const levelOptions = ["Beginner", "Intermediate", "Advanced"];
const typeOptions = ["Theory", "MCQ", "Rapid-Fire"];
const companyOptions = ["Google", "Amazon", "Microsoft", "Meta", "Facebook"];

function FilterSection({ filters, setFilters }) {
  // Helper to toggle filters in arrays
  const toggleFilter = (key, value) => {
    const currentSet = new Set(filters[key]);
    if (currentSet.has(value)) {
      currentSet.delete(value);
    } else {
      currentSet.add(value);
    }
    setFilters({ ...filters, [key]: Array.from(currentSet) });
  };

  return (
    <div className="w-64 p-4 border-r border-gray-300 h-screen sticky top-0 overflow-y-auto">
      <h2 className="font-bold text-xl mb-4">Filters</h2>

      <div className="mb-6">
        <h3 className="font-semibold mb-2">Tech Stack</h3>
        <div className="flex flex-col space-y-1 max-h-48 overflow-y-auto">
          {techOptions.map((tech) => (
            <label key={tech} className="inline-flex items-center space-x-2">
              <input
                type="checkbox"
                checked={filters.tech.includes(tech)}
                onChange={() => toggleFilter("tech", tech)}
                className="form-checkbox"
              />
              <span>{tech}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h3 className="font-semibold mb-2">Difficulty Level</h3>
        <div className="flex flex-col space-y-1">
          {levelOptions.map((level) => (
            <label key={level} className="inline-flex items-center space-x-2">
              <input
                type="checkbox"
                checked={filters.level.includes(level)}
                onChange={() => toggleFilter("level", level)}
                className="form-checkbox"
              />
              <span>{level}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h3 className="font-semibold mb-2">Question Type</h3>
        <div className="flex flex-col space-y-1">
          {typeOptions.map((type) => (
            <label key={type} className="inline-flex items-center space-x-2">
              <input
                type="checkbox"
                checked={filters.type.includes(type)}
                onChange={() => toggleFilter("type", type)}
                className="form-checkbox"
              />
              <span>{type}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h3 className="font-semibold mb-2">Company</h3>
        <div className="flex flex-col space-y-1 max-h-40 overflow-y-auto">
          {companyOptions.map((comp) => (
            <label key={comp} className="inline-flex items-center space-x-2">
              <input
                type="checkbox"
                checked={filters.company.includes(comp)}
                onChange={() => toggleFilter("company", comp)}
                className="form-checkbox"
              />
              <span>{comp}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Reset filters button */}
      <button
        onClick={() =>
          setFilters({ tech: [], level: [], type: [], company: [] })
        }
        className="mt-4 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Reset Filters
      </button>
    </div>
  );
}

function QuestionCard({ question, onToggleExpand, expanded, onBookmark, onShare }) {
  return (
    <div
      className="bg-white border border-gray-200 rounded-lg p-6 mb-6 transition-colors hover:border-indigo-400 cursor-pointer"
      onClick={() => onToggleExpand(question.id)}
      id={`question-${question.id}`}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onToggleExpand(question.id);
      }}
    >
      {/* Title */}
      <h3 className="text-lg font-bold text-center text-gray-800 mb-3 uppercase tracking-wide">
        {question.title}
      </h3>

      {/* Answer Summary */}
      <p className="text-sm text-gray-600 text-center mb-4">
        {question.answer}
      </p>

      {/* Buttons */}
      <div className="flex justify-center gap-5 mb-4">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onBookmark(question.id);
          }}
          title="Bookmark"
          className="text-gray-500 hover:text-indigo-600 transition"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path d="M5 5v14l7-7 7 7V5z" />
          </svg>
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onShare(question.id);
          }}
          title="Share"
          className="text-gray-500 hover:text-indigo-600 transition"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <circle cx="18" cy="5" r="3" />
            <circle cx="6" cy="12" r="3" />
            <circle cx="18" cy="19" r="3" />
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
          </svg>
        </button>
      </div>

      {/* Full Answer Section */}
      {expanded && (
        <div className="mt-4 p-4 bg-indigo-50 text-indigo-900 rounded-lg text-sm leading-relaxed transition-all">
          {question.fullAnswer}
        </div>
      )}

      {/* Tags */}
      <div className="mt-4 flex flex-wrap justify-center gap-2">
        {question.tags.map((tag) => (
          <span
            key={tag}
            className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-xs font-medium"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}



export default function BrowseTopic() {
  // Filters state
  const [filters, setFilters] = useState({
    tech: [],
    level: [],
    type: [],
    company: [],
  });

  // Expanded question id for full answer
  const [expandedId, setExpandedId] = useState(null);

  // Pagination state
  const [page, setPage] = useState(1);
  const pageSize = 4;

  // Filter logic
  const filteredQuestions = dummyQuestions.filter((q) => {
    // Tech filter
    if (filters.tech.length && !filters.tech.includes(q.tech)) return false;
    // Level filter
    if (filters.level.length && !filters.level.includes(q.level)) return false;
    // Type filter
    if (filters.type.length && !filters.type.includes(q.type)) return false;
    // Company filter
    if (filters.company.length && !q.company.some((c) => filters.company.includes(c)))
      return false;

    return true;
  });

  // If no filter selected, show random questions (slice for page size)
  const questionsToShow =
    filters.tech.length || filters.level.length || filters.type.length || filters.company.length
      ? filteredQuestions.slice(0, page * pageSize)
      : // No filter, show random questions (shuffled)
        dummyQuestions
          .sort(() => 0.5 - Math.random())
          .slice(0, page * pageSize);

  // Handlers
  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };
  const handleBookmark = (id) => {
    alert(`Bookmark toggled for question id ${id}`);
  };
  const handleShare = (id) => {
    const shareURL = window.location.href + `#question-${id}`;
    navigator.clipboard.writeText(shareURL);
    alert("Link copied to clipboard!");
  };

  return (
    <div className="flex">
      {/* Sidebar filters */}
      <FilterSection filters={filters} setFilters={setFilters} />

      {/* Main content */}
      <main className="flex-1 p-6 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Browse Interview Questions</h1>

        {questionsToShow.length === 0 && (
          <p className="text-center text-gray-500">No questions found.</p>
        )}

        {questionsToShow.map((q) => (
          <QuestionCard
            key={q.id}
            question={q}
            expanded={expandedId === q.id}
            onToggleExpand={toggleExpand}
            onBookmark={handleBookmark}
            onShare={handleShare}
          />
        ))}

        {/* Show More */}
        {questionsToShow.length < (filters.tech.length ||
        filters.level.length ||
        filters.type.length ||
        filters.company.length
          ? filteredQuestions.length
          : dummyQuestions.length) && (
          <div className="text-center mt-8">
            <button
              onClick={() => setPage(page + 1)}
              className="px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
            >
              Show More
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
