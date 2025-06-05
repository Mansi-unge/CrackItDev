// pages/Challenges.jsx
import React from "react";
import { FaReact, FaNodeJs, FaJava, FaPython } from "react-icons/fa"; // use appropriate icons
import { SiMongodb } from "react-icons/si";
import { useNavigate } from "react-router-dom";

const techStacks = [
  {
    name: "React",
    description: "Frontend JavaScript library for building UIs.",
    Icon: FaReact,
    color: "#61DBFB",
  },
  {
    name: "Node.js",
    description: "JavaScript runtime for backend development.",
    Icon: FaNodeJs,
    color: "#3C873A",
  },
  {
    name: "Java",
    description: "Robust backend language widely used in enterprise.",
    Icon: FaJava,
    color: "#007396",
  },
  {
    name: "Python",
    description: "High-level programming language for all purposes.",
    Icon: FaPython,
    color: "#FFD43B",
  },
];

const Challenges = () => {
  const navigate = useNavigate();

  return (
    <div className="p-6 grid sm:grid-cols-2 md:grid-cols-3 gap-6">
      {techStacks.map((stack) => (
        <div
          key={stack.name}
          className="bg-white rounded-2xl shadow-md p-6 border hover:scale-[1.01] transition-all"
        >
          <stack.Icon size={40} color={stack.color} className="mb-4" />
          <h3 className="text-xl font-semibold">{stack.name}</h3>
          <p className="text-gray-600 mb-4">{stack.description}</p>
          <button
            onClick={() => navigate(`/challenges/${stack.name.toLowerCase()}`)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Take Challenge
          </button>
        </div>
      ))}
    </div>
  );
};

export default Challenges;
