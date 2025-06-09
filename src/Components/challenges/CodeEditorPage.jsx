import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import AceEditor from "react-ace";
import axios from "axios";

import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-monokai";

const RAPIDAPI_HOST = "judge0-ce.p.rapidapi.com";
const RAPIDAPI_KEY = "38fd419146msh7d5f69ac084ffeap12bd89jsn998613925d47";

const languageMap = {
  Java: "java",
  Python: "python",
  C: "c_cpp",
  "C++": "c_cpp",
  JavaScript: "javascript",
  TypeScript: "typescript",
  Go: "go",
  Ruby: "ruby",
  CSharp: "csharp",
  PHP: "php",
  Swift: "swift",
  Rust: "rust",
  Kotlin: "kotlin",
  Scala: "scala",
  SQL: "sql",
  Perl: "perl",
  Lua: "lua",
  Bash: "sh",
};

const languageIdMap = {
  python: 71,
  java: 62,
  javascript: 63,
  c_cpp: 54,
  c: 50,
  typescript: 74,
  go: 60,
  ruby: 72,
  php: 68,
  swift: 83,
  rust: 73,
  kotlin: 78,
  scala: 81,
  sql: 82,
  csharp: 51,
  perl: 85,
  lua: 64,
  sh: 46,
};

const normalizeText = (text = "") =>
  text
    .trim()
    .replace(/\r\n/g, "\n")
    .replace(/\s+/g, " ")
    .toLowerCase();

const insertUserLogic = (template, logic) => {
  // Replace the placeholder comment with user's logic.
  // If no placeholder found, fallback to concatenation.
  if (template.includes("// Write your code here")) {
    return template.replace("// Write your code here", logic.trim());
  }
  return template + "\n" + logic.trim();
};

const CodeEditorPage = () => {
  const { id } = useParams();
  const [question, setQuestion] = useState(null);
  const [code, setCode] = useState("");
  const [userLogic, setUserLogic] = useState("// Write your logic here\n");
  const [output, setOutput] = useState("");
  const [badgeEarned, setBadgeEarned] = useState(false);
  const [results, setResults] = useState([]);
  const [running, setRunning] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!id) return;
    axios.get(`http://localhost:5000/api/questions/${id}`).then((res) => {
      setQuestion(res.data);
      setCode(res.data.codeTemplate || "");
      setUserLogic("// Write your logic here\n");
      setOutput("");
      setBadgeEarned(false);
      setResults([]);
    });
  }, [id]);

  const runCode = useCallback(async () => {
    if (!question) return;
    setRunning(true);
    setOutput("Running code...");
    try {
      const langKey = (languageMap[question.tech] || "python").toLowerCase();
      const language_id = languageIdMap[langKey] || 71;

      // **Replace placeholder with user logic**
      const finalCode = insertUserLogic(code, userLogic);

      console.log("Running code with finalCode:", finalCode);

      const submission = await axios.post(
        `https://${RAPIDAPI_HOST}/submissions?base64_encoded=false&wait=false`,
        {
          source_code: finalCode,
          language_id,
          stdin: question.sampleInput || "",
        },
        {
          headers: {
            "x-rapidapi-host": RAPIDAPI_HOST,
            "x-rapidapi-key": RAPIDAPI_KEY,
          },
        }
      );

      const { token } = submission.data;

      const fetchResult = async () => {
        try {
          const result = await axios.get(
            `https://${RAPIDAPI_HOST}/submissions/${token}`,
            {
              params: {
                base64_encoded: "false",
                fields: "stdout,stderr,status_id,status",
              },
              headers: {
                "x-rapidapi-host": RAPIDAPI_HOST,
                "x-rapidapi-key": RAPIDAPI_KEY,
              },
            }
          );

          if (result.data.status_id <= 2) {
            // status_id 1 or 2 means In Queue or Processing
            setTimeout(fetchResult, 1000);
          } else {
            const { stdout, stderr, status } = result.data;
            if (stderr) {
              setOutput(`Error:\n${stderr}`);
            } else if (stdout) {
              setOutput(stdout);
            } else {
              setOutput("No output");
            }
            setRunning(false);
          }
        } catch (err) {
          console.error("Error fetching result:", err?.response?.data || err.message);
          setOutput("Error fetching result: " + err.message);
          setRunning(false);
        }
      };

      fetchResult();
    } catch (error) {
      setOutput("Error running code: " + error.message);
      setRunning(false);
    }
  }, [code, userLogic, question]);

  const handleSubmit = async () => {
    if (!question) return;
    setSubmitting(true);
    setResults([]);
    setOutput("Submitting and validating...");

    try {
      const token = localStorage.getItem("token"); // Your auth token
      const langKey = (languageMap[question.tech] || "python").toLowerCase();
      const language_id = languageIdMap[langKey] || 71;

      // **Replace placeholder with user logic**
      const finalCode = insertUserLogic(code, userLogic);

      let passedCount = 0;
      const testResults = [];

      for (const testCase of question.testCases) {
        try {
          const { data } = await axios.post(
            `https://${RAPIDAPI_HOST}/submissions?base64_encoded=false&wait=true`,
            {
              source_code: finalCode,
              language_id,
              stdin: testCase.input,
            },
            {
              headers: {
                "x-rapidapi-host": RAPIDAPI_HOST,
                "x-rapidapi-key": RAPIDAPI_KEY,
              },
            }
          );

          const outputText = normalizeText(data.stdout || data.stderr || "");
          const expected = normalizeText(testCase.output || "");

          const passed = outputText === expected;
          if (passed) passedCount++;

          testResults.push({
            input: testCase.input,
            expected: testCase.output,
            actual: data.stdout || data.stderr || "No output",
            pass: passed,
          });
        } catch (error) {
          testResults.push({
            input: testCase.input,
            expected: testCase.output,
            actual: "Error during execution",
            pass: false,
          });
        }
      }

      setResults(testResults);
      setOutput(`${passedCount} / ${question.testCases.length} test cases passed`);

      if (passedCount === question.testCases.length) {
        try {
          await axios.post(
            "http://localhost:5000/api/coding/save",
            {
              questionId: question._id,
              submittedCode: finalCode,
              isCorrect: true,
              techStack: question.tech,
              isDailyChallenge: false,
            },
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          setBadgeEarned(true);
          alert("🎉 All test cases passed! Badge awarded!");
        } catch (error) {
          if (error.response?.data?.message === "Already solved") {
            alert("✅ Already solved this challenge.");
          } else {
            console.error("Error saving progress:", error);
          }
        }
      } else {
        alert(`❌ ${passedCount} / ${question.testCases.length} passed. Try again.`);
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (!question) return <div>Loading...</div>;

  return (
    <div className="flex flex-col lg:flex-row w-full py-2 bg-gray-50 text-gray-800">
      {/* Problem Section */}
      <section className="lg:w-1/2 w-full p-6 flex flex-col justify-between space-y-6">
        <header>
          <h1 className="text-2xl font-bold mb-1">{question.title}</h1>
          <p className="text-md font-medium text-gray-800 border-b pb-2">Topic: {question.topic}</p>
        </header>

        {question.hints?.length > 0 && (
          <section className="mt-4">
            <h2 className="font-medium mb-1 text-gray-700">Hints:</h2>
            <ul className="list-disc pl-6 space-y-1 text-sm text-gray-700">
              {question.hints.map((hint, idx) => (
                <li key={idx}>{hint}</li>
              ))}
            </ul>
          </section>
        )}

        {badgeEarned && (
          <p className="text-green-700 font-semibold mt-4">
            🥈 Silver badge awarded for solving this challenge!
          </p>
        )}

        <div className="flex gap-4 mt-auto pt-4">
          <button
            onClick={runCode}
            disabled={running || submitting}
            className={`${
              running || submitting ? "bg-blue-300 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
            } text-white px-5 py-2 rounded-md text-sm`}
          >
            {running ? "Running..." : "Run Code"}
          </button>
          <button
            onClick={handleSubmit}
            disabled={running || submitting}
            className={`${
              submitting || running ? "bg-green-300 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
            } text-white px-5 py-2 rounded-md text-sm`}
          >
            {submitting ? "Submitting..." : "Submit"}
          </button>
        </div>
      </section>

      {/* IDE Section */}
      <aside className="lg:w-1/2 w-full space-y-4 bg-white border-l border-gray-200 p-4">
        <h3 className="font-bold text-sm text-gray-700">Code Template (Fixed)</h3>
        <AceEditor
          mode={languageMap[question.tech] || "text"}
          theme="monokai"
          value={code}
          readOnly
          name="template-editor"
          editorProps={{ $blockScrolling: true }}
          width="100%"
          height="200px"
          fontSize={16}
        />

        <h3 className="font-bold text-sm text-gray-700">Your Logic</h3>
        <AceEditor
          mode={languageMap[question.tech] || "text"}
          theme="monokai"
          value={userLogic}
          onChange={setUserLogic}
          name="logic-editor"
          editorProps={{ $blockScrolling: true }}
          width="100%"
          height="350px"
          fontSize={16}
        />

        {/* Show test case results */}
        {results.length > 0 && (
          <div className="bg-gray-100 p-4 text-sm mt-2 rounded shadow-inner max-h-100 overflow-y-auto">
            <h2 className="font-semibold mb-2">Test Case Results:</h2>
            <ul className="space-y-2">
              {results.map((r, idx) => (
                <li key={idx}>
                  <p>
                    🧪 <span className="font-medium">Input:</span> {r.input}
                  </p>
                  <p>
                    ✅ <span className="font-medium">Expected:</span> {r.expected}
                  </p>
                  <p>
                    📤 <span className="font-medium">Your Output:</span> {r.actual}
                  </p>
                  <p className={r.pass ? "text-green-600 font-semibold" : "text-red-600 font-semibold"}>
                    {r.pass ? "✔ Passed" : "❌ Failed"}
                  </p>
                  <hr />
                </li>
              ))}
            </ul>
          </div>
        )}

        {output && (
          <section className="text-md bg-black p-2 text-green-300 whitespace-pre-wrap overflow-y-auto max-h-40 mt-2 rounded">
            <h3 className="text-white font-semibold mb-2">Output:</h3>
            <pre>{output}</pre>
          </section>
        )}
      </aside>
    </div>
  );
};

export default CodeEditorPage;
