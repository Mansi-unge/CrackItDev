import React, { useEffect, useState } from "react";

const techStacks = [
  { name: "Java", desc: "Master Java with 30 days of OOP & DSA", image: "/images/java.png" },
  { name: "React", desc: "Sharpen your frontend skills", image: "/images/react.png" },
  { name: "Node.js", desc: "Backend logic and API mastery", image: "/images/node.png" },
];

const Challenge = () => {
  const [selectedTech, setSelectedTech] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [filters, setFilters] = useState({ topic: "", level: "" });
  const [showHint, setShowHint] = useState(null);
  const [streak, setStreak] = useState(5); // Simulated streak

  useEffect(() => {
    if (selectedTech) {
      // Simulate fetching questions
      const dummyQuestions = [
        {
          _id: 1,
          title: `Sample ${selectedTech} Question 1`,
          description: "Solve this problem using recursion.",
          hint: "Think about base case and recursive case.",
          level: "beginner",
          topic: "Recursion",
        },
        {
          _id: 2,
          title: `Sample ${selectedTech} Question 2`,
          description: "Optimize time complexity using hashmap.",
          hint: "Use frequency map.",
          level: "intermediate",
          topic: "HashMap",
        },
      ];
      setQuestions(dummyQuestions);
    }
  }, [selectedTech, filters]);

  const filteredQuestions = questions.filter(
    (q) =>
      (!filters.topic || q.topic === filters.topic) &&
      (!filters.level || q.level === filters.level)
  );

  if (!selectedTech) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <h2 className="text-3xl font-bold mb-6">Take a 30-Day Challenge</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {techStacks.map((stack) => (
            <div
              key={stack.name}
              className="border rounded-xl p-4 shadow hover:scale-105 transition"
            >
              <img src={stack.image} alt={stack.name} className="w-16 h-16" />
              <h3 className="text-xl font-semibold mt-2">{stack.name}</h3>
              <p className="text-sm text-gray-600">{stack.desc}</p>
              <button
                className="mt-4 bg-indigo-600 text-white py-2 px-4 rounded-lg"
                onClick={() => setSelectedTech(stack.name)}
              >
                Take Challenge
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex">
      <aside className="w-64 p-4 border-r">
        <h3 className="text-lg font-semibold mb-2">Filters</h3>
        <label className="block mb-1">Topic</label>
        <select
          className="w-full border p-2 rounded"
          value={filters.topic}
          onChange={(e) => setFilters({ ...filters, topic: e.target.value })}
        >
          <option value="">All</option>
          <option value="Recursion">Recursion</option>
          <option value="HashMap">HashMap</option>
        </select>

        <label className="block mt-4 mb-1">Difficulty</label>
        <select
          className="w-full border p-2 rounded"
          value={filters.level}
          onChange={(e) => setFilters({ ...filters, level: e.target.value })}
        >
          <option value="">All</option>
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>
      </aside>

      <main className="flex-1 p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Today’s {selectedTech} Challenge</h1>
          <div className="flex items-center space-x-3">
            <span className="text-sm">🔥 {streak} day streak</span>
            {streak % 7 === 0 && (
              <span className="bg-gray-300 px-2 py-1 rounded text-sm">🥈 Weekly Badge</span>
            )}
            {streak === 30 && (
              <span className="bg-yellow-300 px-2 py-1 rounded text-sm">🏅 Golden Badge</span>
            )}
          </div>
        </div>

        {filteredQuestions.map((q) => (
          <div key={q._id} className="p-4 border rounded-lg shadow">
            <h3 className="font-semibold text-xl">{q.title}</h3>
            <p className="text-gray-600 text-sm">{q.description}</p>
            <div className="mt-3 flex gap-4 items-center">
              <span className="text-sm bg-yellow-200 px-3 py-1 rounded-full">
                {q.level}
              </span>
              <button
                onClick={() => setShowHint(showHint === q._id ? null : q._id)}
                className="text-indigo-600 hover:underline"
              >
                {showHint === q._id ? "Hide Hint" : "Show Hint"}
              </button>
              <button className="ml-auto bg-green-600 text-white px-4 py-1 rounded-lg">
                Mark as Done
              </button>
            </div>
            {showHint === q._id && (
              <div className="mt-2 text-sm italic text-gray-700">{q.hint}</div>
            )}
          </div>
        ))}
      </main>
    </div>
  );
};

export default Challenge;
