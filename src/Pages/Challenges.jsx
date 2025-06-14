import React from "react";
import { FaReact, FaNodeJs, FaJava, FaPython } from "react-icons/fa";
import TechStackCard from "../Components/challenges/TechStackCard";

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
  return (
    <section className="p-6 grid sm:grid-cols-2 md:grid-cols-4 gap-6">
      {techStacks.map(({ name, description, Icon, color }) => (
        <TechStackCard
          key={name}
          tech={name}
          description={description}
          Icon={Icon}
          color={color}
        />
      ))}
    </section>
  );
};

export default Challenges;
