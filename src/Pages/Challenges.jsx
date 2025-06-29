import React from "react";
import { FaReact, FaNodeJs, FaJava, FaPython, FaJsSquare } from "react-icons/fa";
import { SiC, SiCplusplus } from "react-icons/si";
import TechStackCard from "../Components/challenges/TechStackCard";

const techStacks = [
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
  {
  name: "C programming",
  description: "The foundation of modern programming — C is fast, close to hardware, and ideal for system-level development.",
  Icon: SiC,
  color: "#A8B9CC",
},
{
  name: "Cpp",
  description: "Powerful and performance-focused, C++ adds OOP to C — perfect for game engines, real-time systems, and high-performance apps.",
  Icon: SiCplusplus,
  color: "#00599C",
},
{
  name: "JavaScript",
  description: "The language of the web — build interactive, dynamic experiences across browsers, servers, and frameworks.",
  Icon: FaJsSquare,
  color: "#F7DF1E",
}

];

const Challenges = () => {
  const currentTech = localStorage.getItem("currentTech"); // e.g., "Java"

  const inProgressStack = techStacks.find(
    (stack) => stack.name.toLowerCase() === currentTech?.toLowerCase()
  );

  const otherStacks = techStacks.filter(
    (stack) => stack.name.toLowerCase() !== currentTech?.toLowerCase()
  );

  return (
    <div className="p-6 space-y-10">
      {inProgressStack && (
        <div>
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center text-green-600">In Progress</h2>
          <section className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            <TechStackCard
              tech={inProgressStack.name}
              description={inProgressStack.description}
              Icon={inProgressStack.Icon}
              color={inProgressStack.color}
            />
          </section>
        </div>
      )}

      <div>
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center text-blue-700">
          {inProgressStack ? "Other Tech Stacks" : "Available Challenges"}
        </h2>
        <section className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {otherStacks.map(({ name, description, Icon, color }) => (
            <TechStackCard
              key={name}
              tech={name}
              description={description}
              Icon={Icon}
              color={color}
            />
          ))}
        </section>
      </div>
    </div>
  );
};

export default Challenges;
