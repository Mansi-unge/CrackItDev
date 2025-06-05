import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AceEditor from "react-ace";
import axios from "axios";

// Ace Editor modes
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-typescript";
import "ace-builds/src-noconflict/mode-rust";
import "ace-builds/src-noconflict/mode-csharp";
import "ace-builds/src-noconflict/mode-kotlin";
import "ace-builds/src-noconflict/mode-swift";
import "ace-builds/src-noconflict/mode-scala";
import "ace-builds/src-noconflict/mode-golang";
import "ace-builds/src-noconflict/mode-ruby";
import "ace-builds/src-noconflict/mode-php";
import "ace-builds/src-noconflict/mode-sql";
import "ace-builds/src-noconflict/mode-lua";
import "ace-builds/src-noconflict/mode-perl";
import "ace-builds/src-noconflict/mode-sh";
import "ace-builds/src-noconflict/mode-text";

// Ace Editor theme
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
    Java: "java", Python: "python", C: "c_cpp", "C++": "c_cpp", JavaScript: "javascript",
    TypeScript: "typescript", Go: "golang", Ruby: "ruby", CSharp: "csharp", PHP: "php",
    Swift: "swift", Rust: "rust", Kotlin: "kotlin", Scala: "scala", SQL: "sql",
    Perl: "perl", Lua: "lua", Bash: "sh",
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

  const normalizeText = (str) => {
    if (!str) return "";
    return str
      .replace(/\r\n/g, "\n")
      .split("\n")
      .map(line => line.trim())
      .filter(line => line.length > 0)
      .join("\n")
      .trim();
  };

  const runCode = async () => {
    if (!question) return;
    try {
      const languageIdMap = {
        python: 71, java: 62, javascript: 63, c_cpp: 54, c: 50,
        typescript: 74, go: 60, ruby: 72, php: 68, swift: 83,
        rust: 73, kotlin: 78, scala: 81, sql: 82, csharp: 51,
        perl: 85, lua: 64, bash: 46,
      };

      const lang = (languageMap[question.tech] || "text").toLowerCase();
      const language_id = languageIdMap[lang] || 71;

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
          setTimeout(fetchResult, 1000);
        } else {
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

    const actualOutput = normalizeText(output);
    const expectedOutput = normalizeText(question.expectedOutput || question.sampleOutput || "");

    if (actualOutput === expectedOutput) {
      setBadgeEarned(true);
      alert("🎉 Correct Solution! Badge Earned!");
    } else {
      alert("❌ Incorrect Solution. Please try again.");
    }
  };

  if (!question) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 flex flex-col xl:flex-row gap-6 bg-[#f8fafc] min-h-screen font-sans">
      {/* Left section: Editor + Console */}
      <div className="flex-1 space-y-4">
        <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">{question.title}</h2>
          <p className="text-sm text-gray-500 mt-1">Topic: {question.topic}</p>
        </div>

        <div className="rounded-2xl shadow-sm overflow-hidden border border-gray-300">
          <AceEditor
            mode={languageMap[question.tech] || "text"}
            theme="monokai"
            value={code}
            onChange={setCode}
            name="code-editor"
            editorProps={{ $blockScrolling: true }}
            width="100%"
            height="350px"
            fontSize={16}
            className="rounded-t-2xl"
          />
        </div>

        <div className="flex gap-4 mt-2">
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-md shadow-sm transition"
            onClick={runCode}
          >
            ▶ Run Code
          </button>
          <button
            className={`bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-md shadow-sm transition ${!output && "opacity-50 cursor-not-allowed"}`}
            onClick={handleSubmit}
            disabled={!output}
          >
            ✅ Submit
          </button>
        </div>

        {output && (
          <div className="bg-black text-green-400 font-mono p-4 mt-4 rounded-lg shadow-inner text-sm max-h-60 overflow-auto">
            <div className="text-white font-semibold mb-2">📤 Output:</div>
            <pre>{output}</pre>
          </div>
        )}

        {badgeEarned && (
          <div className="text-green-700 font-bold mt-4 text-lg">🏅 Badge Earned!</div>
        )}
      </div>

      {/* Right section: Hints */}
      <div className="xl:w-1/4 w-full bg-white shadow-md border border-gray-200 rounded-2xl p-6 h-fit">
        <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-1">
          💡 Hints
        </h3>
        {question.hints?.length > 0 ? (
          <ul className="list-disc ml-4 space-y-2 text-gray-700 text-sm">
            {question.hints.map((hint, idx) => (
              <li key={idx}>{hint}</li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 text-sm">No hints available for this problem.</p>
        )}
      </div>
    </div>
  );
};

export default CodeEditorPage;
