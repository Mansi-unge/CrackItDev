import axios from "axios";

const RAPIDAPI_HOST = "judge0-ce.p.rapidapi.com";
const RAPIDAPI_KEY = "38fd419146msh7d5f69ac084ffeap12bd89jsn998613925d47";

const languageMap = {
  Java: "java",
  Python: "python",
  C: "c_cpp",
  "C++": "c_cpp",
  JavaScript: "javascript",
  TypeScript: "typescript",
};

const languageIdMap = {
  python: 71,
  java: 62,
  javascript: 63,
  c_cpp: 54,
  c: 50,
  typescript: 74,
};

export const normalizeText = (text = "") =>
  text.trim().replace(/\r\n/g, "\n").replace(/\s+/g, " ").toLowerCase();

export const insertUserLogic = (template, logic) => {
  if (template.includes("// Write your code here")) {
    return template.replace("// Write your code here", logic.trim());
  }
  return template + "\n" + logic.trim();
};

export const fetchQuestionById = async (id) => {
  const res = await axios.get(`http://localhost:5000/api/coding/${id}`);
  return res.data;
};

export const fetchUserProgress = async (token) => {
  const res = await axios.get("http://localhost:5000/api/coding/progress", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const runCodeOnJudge0 = async (tech, sourceCode, stdin) => {
  const langKey = (languageMap[tech] || "python").toLowerCase();
  const language_id = languageIdMap[langKey] || 71;

  const { data } = await axios.post(
    `https://${RAPIDAPI_HOST}/submissions?base64_encoded=false&wait=true`,
    {
      source_code: sourceCode,
      language_id,
      stdin,
    },
    {
      headers: {
        "x-rapidapi-host": RAPIDAPI_HOST,
        "x-rapidapi-key": RAPIDAPI_KEY,
      },
    }
  );

  if (data.stderr) return `Error:\n${data.stderr}`;
  return data.stdout || "No output";
};

export const submitTestCaseOnJudge0 = async (tech, sourceCode, stdin) => {
  const langKey = (languageMap[tech] || "python").toLowerCase();
  const language_id = languageIdMap[langKey] || 71;

  const { data } = await axios.post(
    `https://${RAPIDAPI_HOST}/submissions?base64_encoded=false&wait=true`,
    {
      source_code: sourceCode,
      language_id,
      stdin,
    },
    {
      headers: {
        "x-rapidapi-host": RAPIDAPI_HOST,
        "x-rapidapi-key": RAPIDAPI_KEY,
      },
    }
  );

  return data;
};

export const submitSolutionToBackend = async (token, question, finalCode) => {
  await axios.post(
    "http://localhost:5000/api/coding/save",
    {
      questionId: question._id,
      submittedCode: finalCode,
      isCorrect: true,
      techStack: question.tech,
      topic: question.topic,
      isDailyChallenge: false,
    },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};
