import React, { useState } from "react";

// Dummy questions array
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
    answer: "Closure allows a function to access variables from an enclosing scope.",
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
];

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
  const toggleFilter = (key, value) => {
    const currentSet = new Set(filters[key]);
    currentSet.has(value) ? currentSet.delete(value) : currentSet.add(value);
    setFilters({ ...filters, [key]: Array.from(currentSet) });
  };

  return (
    <div className="w-64 p-4 border-r border-gray-300 h-screen sticky top-0 overflow-y-auto">
      <h2 className="font-bold text-xl mb-4">Filters</h2>

      {/* Tech */}
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

      {/* Level */}
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

      {/* Type */}
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

      {/* Company */}
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

function QuestionCard({
  question,
  onToggleExpand,
  expanded,
  onBookmark,
  onShare,
  isBookmarked,
}) {
  return (
    <div
      className="bg-white border border-gray-200 rounded-lg p-6 mb-6 transition hover:border-indigo-400 cursor-pointer"
      onClick={() => onToggleExpand(question.id)}
      id={`question-${question.id}`}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onToggleExpand(question.id);
      }}
    >
      <h3 className="text-lg font-bold text-center text-gray-800 mb-3 uppercase">
        {question.title}
      </h3>

      <p className="text-sm text-gray-600 text-center mb-4">{question.answer}</p>

      <div className="flex justify-center gap-5 mb-4">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onBookmark(question.id);
          }}
          title="Bookmark"
          className="text-gray-500 hover:text-yellow-500 transition"
        >
          {isBookmarked ? (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M5 3v18l7-5 7 5V3z" />
            </svg>
          ) : (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path d="M5 5v14l7-7 7 7V5z" />
            </svg>
          )}
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onShare(question.id);
          }}
          title="Share"
          className="text-gray-500 hover:text-indigo-600 transition"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <circle cx="18" cy="5" r="3" />
            <circle cx="6" cy="12" r="3" />
            <circle cx="18" cy="19" r="3" />
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
          </svg>
        </button>
      </div>

      {expanded && (
        <div className="mt-4 p-4 bg-indigo-50 text-indigo-900 rounded-lg text-sm">
          {question.fullAnswer}
        </div>
      )}

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
  const [filters, setFilters] = useState({
    tech: [],
    level: [],
    type: [],
    company: [],
  });

  const [expandedId, setExpandedId] = useState(null);
  const [page, setPage] = useState(1);
  const pageSize = 4;

  const [bookmarkedQuestions, setBookmarkedQuestions] = useState([]);

  const handleBookmark = (id) => {
    setBookmarkedQuestions((prev) =>
      prev.includes(id) ? prev.filter((q) => q !== id) : [id, ...prev]
    );
  };

  const handleShare = (id) => {
    const shareURL = window.location.href + `#question-${id}`;
    navigator.clipboard.writeText(shareURL);
    alert("Link copied to clipboard!");
  };

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const filteredQuestions = dummyQuestions.filter((q) => {
    if (filters.tech.length && !filters.tech.includes(q.tech)) return false;
    if (filters.level.length && !filters.level.includes(q.level)) return false;
    if (filters.type.length && !filters.type.includes(q.type)) return false;
    if (filters.company.length && !q.company.some((c) => filters.company.includes(c)))
      return false;
    return true;
  });

  const sortedQuestions = [
    ...filteredQuestions.filter((q) => bookmarkedQuestions.includes(q.id)),
    ...filteredQuestions.filter((q) => !bookmarkedQuestions.includes(q.id)),
  ];

  const questionsToShow =
    filters.tech.length || filters.level.length || filters.type.length || filters.company.length
      ? sortedQuestions.slice(0, page * pageSize)
      : [
          ...dummyQuestions.filter((q) => bookmarkedQuestions.includes(q.id)),
          ...dummyQuestions
            .filter((q) => !bookmarkedQuestions.includes(q.id))
            .sort(() => 0.5 - Math.random()),
        ].slice(0, page * pageSize);

  return (
    <div className="flex">
      <FilterSection filters={filters} setFilters={setFilters} />
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
            isBookmarked={bookmarkedQuestions.includes(q.id)}
          />
        ))}

        {questionsToShow.length < sortedQuestions.length && (
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
