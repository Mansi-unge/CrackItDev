import React from "react";
import AceEditor from "react-ace";
import {
  FaVial,
  FaCheck,
  FaUpload,
  FaTimes,
  FaCheckCircle,
} from "react-icons/fa";
import useChallengeHook from "../../Hooks/challenges/useChallengeHook";

import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-monokai";

const languageMap = {
  Java: "java",
  Python: "python",
  C: "c_cpp",
  "C++": "c_cpp",
  JavaScript: "javascript",
  TypeScript: "typescript",
};

const CodeEditorPage = () => {
  const {
    question,
    code,
    userLogic,
    setUserLogic,
    runCode,
    handleSubmit,
    badgeEarned,
    output,
    results,
    running,
    submitting,
    loadingProgress,
  } = useChallengeHook();

  if (!question) return <div>Loading...</div>;

  return (
    <div className="flex flex-col lg:flex-row w-full py-2 bg-gray-50 text-gray-800">
      <section className="lg:w-1/2 w-full p-6 space-y-6">
        <header>
          <h1 className="text-2xl font-bold mb-1">{question.title}</h1>
          <p className="text-md font-medium border-b pb-2">
            Topic: {question.topic}
          </p>
        </header>

        {question.hints?.length > 0 && (
          <section className="mt-4">
            <h2 className="font-medium mb-1">Hints:</h2>
            <ul className="list-disc pl-6 space-y-1 text-sm">
              {question.hints.map((hint, idx) => (
                <li key={idx}>{hint}</li>
              ))}
            </ul>
          </section>
        )}

        {loadingProgress && <p>Loading user progress...</p>}
        {badgeEarned && (
          <p className="text-yellow-700 font-semibold">
            🥉 Bronze badge awarded for solving this challenge!
          </p>
        )}

        <div className="flex gap-4 mt-auto pt-4">
          <button
            onClick={runCode}
            disabled={running || submitting}
            className={`${
              running || submitting
                ? "bg-blue-300 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            } text-white px-5 py-2 rounded-md text-sm`}
          >
            {running ? "Running..." : "Run Code"}
          </button>
          <button
            onClick={handleSubmit}
            disabled={running || submitting}
            className={`${
              submitting || running
                ? "bg-green-300 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            } text-white px-5 py-2 rounded-md text-sm`}
          >
            {badgeEarned
              ? "Already Solved"
              : submitting
              ? "Submitting..."
              : "Submit"}
          </button>
        </div>
      </section>

      <aside className="lg:w-1/2 w-full space-y-4 bg-white border-l border-gray-200 p-4">
        <h3 className="font-bold text-sm">Code Template (Fixed)</h3>
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

        <h3 className="font-bold text-sm ">Your Logic</h3>
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

        {results.length > 0 && (  
          <div className="bg-gray-100 p-4 text-sm mt-2 rounded shadow-inner max-h-100 overflow-y-auto">
            <h2 className="font-semibold mb-2">Test Case Results:</h2>
            <ul className="space-y-4">
              {results.map((r, idx) => (
                <li key={idx}>
                  <p className="flex items-center gap-2">
                    <FaVial className="text-blue-600" />
                    <span className="font-medium">Input:</span> {r.input}
                  </p>
                  <p className="flex items-center gap-2">
                    <FaCheck className="text-green-600" />
                    <span className="font-medium">Expected:</span> {r.expected}
                  </p>
                  <p className="flex items-center gap-2">
                    <FaUpload className="text-purple-600" />
                    <span className="font-medium">Your Output:</span> {r.actual}
                  </p>
                  <p
                    className={`flex items-center gap-2 font-semibold ${
                      r.pass ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {r.pass ? <FaCheckCircle /> : <FaTimes />}
                    {r.pass ? "Passed" : "Failed"}
                  </p>
                  <hr className="my-2" />
                </li>
              ))}
            </ul>
          </div>
        )}

        {output && (
          <section className="bg-black p-2 text-green-300 whitespace-pre-wrap overflow-y-auto max-h-40 mt-2 rounded">
            <h3 className="text-white font-semibold mb-2">Output:</h3>
            <pre>{output}</pre>
          </section>
        )}
      </aside>
    </div>
  );
};

export default CodeEditorPage;
