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
    answer:
      "useState is a React hook for state management in functional components.",
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


export default dummyQuestions