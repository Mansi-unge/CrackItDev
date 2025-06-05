// pages/CodeEditorPage.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AceEditor from "react-ace";
import axios from "axios";

// Ace Editor language modes
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-ruby";
import "ace-builds/src-noconflict/mode-golang";
import "ace-builds/src-noconflict/mode-csharp";
import "ace-builds/src-noconflict/mode-php";
import "ace-builds/src-noconflict/mode-swift";
import "ace-builds/src-noconflict/mode-typescript";
import "ace-builds/src-noconflict/mode-rust";
import "ace-builds/src-noconflict/mode-kotlin";
import "ace-builds/src-noconflict/mode-scala";
import "ace-builds/src-noconflict/mode-sql";
import "ace-builds/src-noconflict/mode-perl";
import "ace-builds/src-noconflict/mode-lua";
import "ace-builds/src-noconflict/mode-sh";
import "ace-builds/src-noconflict/mode-text";

// Theme
import "ace-builds/src-noconflict/theme-monokai";

const RAPIDAPI_HOST = "judge0-ce.p.rapidapi.com";
const RAPIDAPI_KEY = "04e8c8d5d3mshd6786e95417591dp146a01jsn74b309492621";

const CodeEditorPage = () => {
  const { id } = useParams();
  const [question, setQuestion] = useState(null);
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [hintsVisible, setHintsVisible] = useState(false);
  const [badgeEarned, setBadgeEarned] = useState(false);

  const languageMap = {
    Java: "java",
    Python: "python",
    C: "c_cpp",
    "C++": "c_cpp",
    JavaScript: "javascript",
    TypeScript: "typescript",
    Go: "golang",
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

  useEffect(() => {
    axios.get(`http://localhost:5000/api/questions/${id}`).then((res) => {
      const q = res.data;
      setQuestion(q);
      setCode(q.codeTemplate || "");
      setOutput("");
      setBadgeEarned(false);
    });
  }, [id]);

  // Normalize text for fair comparison (ignores trailing spaces, line endings, empty lines)
  const normalizeText = (str) => {
    if (!str) return "";
    return str
      .replace(/\r\n/g, "\n")          // Normalize newlines to \n
      .split("\n")
      .map(line => line.trim())         // Trim each line's start/end spaces
      .filter(line => line.length > 0) // Remove empty lines
      .join("\n")
      .trim();
  };

  const runCode = async () => {
    if (!question) return;
    try {
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
        bash: 46,
      };

      const lang = (languageMap[question.tech] || "text").toLowerCase();

      const language_id = languageIdMap[lang] || 71;

      // Submit code to Judge0 API
      const submission = await axios.post(
        "https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=false",
        {
          source_code: code,
          language_id,
          stdin: question.sampleInput || "",
        },
        {
          headers: {
            "x-rapidapi-host": RAPIDAPI_HOST,
            "x-rapidapi-key": RAPIDAPI_KEY,
            "content-type": "application/json",
          },
        }
      );

      const token = submission.data.token;

      // Poll result function
      const fetchResult = async () => {
        const result = await axios.get(
          `https://judge0-ce.p.rapidapi.com/submissions/${token}?base64_encoded=false`,
          {
            headers: {
              "x-rapidapi-host": RAPIDAPI_HOST,
              "x-rapidapi-key": RAPIDAPI_KEY,
            },
          }
        );

        if (result.data.status.id <= 2) {
          // In queue or processing, retry after 1 second
          setTimeout(fetchResult, 1000);
        } else {
          // Got output
          const outputText = result.data.stdout || result.data.stderr || "No output";
          setOutput(outputText);
        }
      };

      fetchResult();
    } catch (error) {
      setOutput("Error running code: " + error.message);
    }
  };

const handleSubmit = () => {
  if (!question) return;

  const normalizeText = (str) =>
    (str || "")
      .replace(/\r\n/g, "\n")
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.length > 0)
      .join("\n")
      .trim();

  const actualOutput = normalizeText(output);
  const expectedOutput = normalizeText(question.expectedOutput || question.sampleOutput || "");

  console.log("Actual Output:", JSON.stringify(actualOutput));
  console.log("Expected Output:", JSON.stringify(expectedOutput));

  if (actualOutput === expectedOutput) {
    setBadgeEarned(true);
    alert("🎉 Correct Solution! Badge Earned!");
  } else {
    alert("❌ Incorrect Solution. Please try again.");
  }
};



  if (!question) return <div>Loading...</div>;

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-xl font-bold">{question.title}</h2>
      <p className="text-gray-600">Topic: {question.topic}</p>
      <AceEditor
        mode={languageMap[question.tech] || "text"}
        theme="monokai"
        value={code}
        onChange={setCode}
        name="code-editor"
        editorProps={{ $blockScrolling: true }}
        width="100%"
        height="300px"
        fontSize={16}
      />
      <div className="flex space-x-4 mt-4">
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded"
          onClick={runCode}
        >
          Run Code
        </button>
        <button
          className="px-4 py-2 bg-green-600 text-white rounded"
          onClick={handleSubmit}
          disabled={!output}
          title={!output ? "Run code to get output first" : ""}
        >
          Submit
        </button>
      </div>
      {output && (
        <div className="mt-4 text-sm bg-gray-100 p-2 rounded whitespace-pre-wrap">
          <strong>Output:</strong>
          <pre>{output}</pre>
        </div>
      )}
      {hintsVisible && (
        <ul className="list-disc ml-6 mt-2 text-gray-700">
          {question.hints?.map((hint, idx) => (
            <li key={idx}>{hint}</li>
          ))}
        </ul>
      )}
      <button
        onClick={() => setHintsVisible(!hintsVisible)}
        className="text-blue-500 underline"
      >
        {hintsVisible ? "Hide Hints" : "Show Hints"}
      </button>
      {badgeEarned && (
        <div className="text-green-600 font-bold">🏅 Badge Earned!</div>
      )}
    </div>
  );
};

export default CodeEditorPage;
