import React, { useState } from "react";

const techStacks = ["React", "Node.js", "Java", "Python"];

const topicsByTech = {
  React: ["Arrays", "Graph", "Strings"],
  "Node.js": ["Arrays", "Graph", "Strings"],
  Java: ["Arrays", "Sorting", "Strings"],
  Python: ["Arrays", "Sorting", "Strings"],
};

const questions = [
  {
    id: 1,
    tech: "React",
    topic: "Arrays",
    question: "Explain how to use useState hook in React?",
  },
  {
    id: 2,
    tech: "React",
    topic: "Graph",
    question: "How would you implement a graph traversal in React?",
  },
  {
    id: 3,
    tech: "Java",
    topic: "Sorting",
    question: "Explain different sorting algorithms in Java.",
  },
  {
    id: 4,
    tech: "Java",
    topic: "Arrays",
    question: "How to reverse an array in Java?",
  },
  {
    id: 5,
    tech: "Python",
    topic: "Sorting",
    question: "What is the built-in method for sorting lists in Python?",
  },
  {
    id: 6,
    tech: "Node.js",
    topic: "Strings",
    question: "How to handle string operations in Node.js?",
  },
];

export default function QuestionFilter() {
  const [selectedTech, setSelectedTech] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("");

  // Get topics for selected tech
  const topics = selectedTech ? topicsByTech[selectedTech] : [];

  // Filter questions by selected tech and topic
  const filteredQuestions = questions.filter((q) => {
    return (
      (selectedTech ? q.tech === selectedTech : true) &&
      (selectedTopic ? q.topic === selectedTopic : true)
    );
  });

  return (
    <div style={{ maxWidth: 600, margin: "auto", padding: 20, fontFamily: "Arial" }}>
      <h2>Filter Questions by Tech & Topic</h2>

      {/* Tech stack select */}
      <label>
        Select Tech Stack:{" "}
        <select
          value={selectedTech}
          onChange={(e) => {
            setSelectedTech(e.target.value);
            setSelectedTopic(""); // reset topic when tech changes
          }}
        >
          <option value="">-- Select Tech --</option>
          {techStacks.map((tech) => (
            <option key={tech} value={tech}>
              {tech}
            </option>
          ))}
        </select>
      </label>

      <br />
      <br />

      {/* Topic select */}
      <label>
        Select Topic:{" "}
        <select
          value={selectedTopic}
          onChange={(e) => setSelectedTopic(e.target.value)}
          disabled={!selectedTech}
        >
          <option value="">-- Select Topic --</option>
          {topics.map((topic) => (
            <option key={topic} value={topic}>
              {topic}
            </option>
          ))}
        </select>
      </label>

      <br />
      <br />

      {/* Question list */}
      <div>
        <h3>Questions:</h3>
        {filteredQuestions.length === 0 && <p>No questions found.</p>}
        <ul>
          {filteredQuestions.map((q) => (
            <li key={q.id}>
              <strong>{q.tech} - {q.topic}:</strong> {q.question}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
