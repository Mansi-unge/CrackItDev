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

  const runCode = async () => {
    if (!question) return;
    try {
      console.log("Running code...");
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
      console.log("Detected language:", lang);

      const language_id = languageIdMap[lang] || 71;
      console.log("Language ID:", language_id);

      // Submit code to Judge0 via RapidAPI with required headers
      const submission = await axios.post(
        "https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=false",
        {
          source_code: code,
          language_id,
          stdin: question.sampleInput || "",
        }
      );

      console.log("Submission response:", submission.data);

      const token = submission.data.token;

      // Poll for result
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
        console.log("Polling result:", result.data);

        if (result.data.status.id <= 2) {
          // Still in queue or processing
          setTimeout(fetchResult, 1000);
        } else {
          // Output or errors
          const outputText = result.data.stdout || result.data.stderr || "No output";
          setOutput(outputText);
        }
      };

      fetchResult();
    } catch (error) {
      console.error("Run code error:", error);
      setOutput("Error running code: " + error.message);
    }
  };

   const handleSubmit = () => {
    const actual = normalizeText(output);
    const expected = normalizeText(question.expectedOutput || question.sampleOutput || "");

    if (actual === expected) {
      setBadgeEarned(true);
      alert("🎉 Correct Solution! Badge Earned!");
    } else {
      alert("❌ Incorrect Solution. Try again.");
    }
  };

  if (!question) return <div>Loading...</div>;

  return (
  <div className="flex flex-col lg:flex-row w-full py-2 bg-gray-50 text-gray-800">
    {/* Left Side: Problem Section */}
    <div className="lg:w-1/2 w-full p-6 flex flex-col justify-between space-y-6">
      <div>
        <div>
          <h1 className="text-2xl font-bold mb-1">{question.title}</h1>
          <p className="text-md font-medium text-gray-800 border-b pb-2">
            Topic: {question.topic}
          </p>
        </div>

        {question.hints && question.hints.length > 0 && (
          <div className="mt-4">
            <h2 className="font-medium mb-1 text-gray-700">Hints:</h2>
            <ul className="list-disc pl-6 space-y-1 text-sm text-gray-700">
              {question.hints.map((hint, idx) => (
                <li key={idx}>{hint}</li>
              ))}
            </ul>
          </div>
        )}

        {badgeEarned && (
          <div className="text-green-700 font-medium mt-4">
            🏅 You earned a badge!
          </div>
        )}
      </div>

      <div className="flex gap-4 mt-auto pt-4">
        <button
          onClick={runCode}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md text-sm"
        >
          Run Code
        </button>
        <button
          onClick={handleSubmit}
          disabled={!output}
          className={`${
            output ? "bg-green-600 hover:bg-green-700" : "bg-green-300"
          } text-white px-5 py-2 rounded-md text-sm`}
        >
          Submit
        </button>
      </div>
    </div>

    {/* Right Side: IDE + Output */}
    <div className="lg:w-1/2 w-full space-y-4 bg-white border-l border-gray-200">
      <div className="border overflow-hidden">
        <AceEditor
          mode={languageMap[question.tech] || "text"}
          theme="monokai"
          value={code}
          onChange={setCode}
          name="editor"
          editorProps={{ $blockScrolling: true }}
          width="100%"
          height="75vh"
          fontSize={16}
        />
      </div>

      {output && (
        <div className="text-md bg-black p-2 text-green-300 whitespace-pre-wrap overflow-y-auto">
          <div className="text-white font-semibold mb-2">Output:</div>
          <pre>{output}</pre>
        </div>
      )}
    </div>
  </div>
);

};

export default CodeEditorPage;
