import React from "react";
import { FaReact, FaNodeJs, FaJava, FaPython, FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const techStacks = [
  {
    name: "React",
    description: "Build lightning-fast UIs with component-driven architecture used by top startups and enterprises.",
    Icon: FaReact,
    color: "#61DBFB",
  },
  {
    name: "Node.js",
    description: "Power your backend with event-driven JavaScript. Perfect for APIs, real-time apps, and microservices.",
    Icon: FaNodeJs,
    color: "#3C873A",
  },
  {
    name: "Java",
    description: "Write once, run anywhere. Trusted for building scalable, secure, and robust enterprise applications.",
    Icon: FaJava,
    color: "#007396",
  },
  {
    name: "Python",
    description: "From web apps to AI, Python is the go-to language for clean syntax, productivity, and versatility.",
    Icon: FaPython,
    color: "#FFD43B",
  },
];

const Challenges = () => {
  const navigate = useNavigate();

  return (
    <div className="p-6 grid sm:grid-cols-2 md:grid-cols-4 gap-6">
      {techStacks.map((stack) => (
        <div
          key={stack.name}
          className="bg-white rounded-2xl border border-gray-100 shadow-md hover:shadow-xl transition-all duration-300 p-5 flex flex-col justify-between"
        >
          {/* Top Row: Icon + Title + Button */}
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center space-x-3">
              <div
                className="w-10 h-10 flex items-center justify-center rounded-full"
                style={{ backgroundColor: `${stack.color}20` }}
              >
                <stack.Icon size={20} color={stack.color} />
              </div>
              <h3 className="text-lg font-semibold text-gray-800">
                {stack.name}
              </h3>
            </div>
            <button
              onClick={() =>
                navigate(`/challenges/${stack.name.toLowerCase()}`)
              }
              className="flex items-center gap-2 bg-blue-600 text-white text-xs px-3 py-1.5 rounded-full hover:bg-blue-700 transition"
            >
              Take Challenge <FaArrowRight size={10} />
            </button>
          </div>

          {/* Description */}
          <p className="text-gray-600 text-sm leading-relaxed">
            {stack.description}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Challenges;
