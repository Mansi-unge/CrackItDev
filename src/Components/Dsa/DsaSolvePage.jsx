// 📁 src/pages/DsaSolvePage.jsx
import React from "react";
import useDsaSolve from "../../Hooks/Dsa/useDsaSolve";
import AceEditor from "react-ace";
import { FaVial, FaCheck, FaUpload, FaTimes, FaCheckCircle} from "react-icons/fa";
import { GiTwoCoins } from "react-icons/gi";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-monokai";
import { FaSpinner } from "react-icons/fa";

const languageMap = {
  Java: "java",
  Python: "python",
  C: "c_cpp",
  "C++": "c_cpp",
  JavaScript: "javascript",
};

const DsaSolvePage = () => {
  const {
    question,
    selectedLang,
    setSelectedLang,
    userLogic,
    setUserLogic,
    results,
    output,
    running,
    submitted,
    handleRunCode,
    handleSubmitSolution,
    awardedPoints,
    totalDsaPoints,
  } = useDsaSolve();

  if (!question) return <div className="flex-1 flex flex-col my-10 items-center justify-center text-blue-600 text-lg font-medium">
  
               <FaSpinner className="animate-spin text-6xl mt-40" />
            </div>

  return (
    <div className="flex flex-col lg:flex-row w-full py-4 bg-gray-50 text-gray-800">
      <section className="lg:w-1/2 w-full p-6 space-y-6">
        <h1 className="text-2xl font-bold">{question.title}</h1>
        <p className="text-sm text-gray-700">{question.description}</p>

        <div>
          <h2 className="font-semibold">Constraints:</h2>
          <p className="text-sm">{question.constraints}</p>
        </div>

        <div>
          <h2 className="font-semibold">Examples:</h2>
          {question.examples.map((ex, i) => (
            <div key={i} className="mb-2 text-sm">
              <p><strong>Input:</strong> {ex.input}</p>
              <p><strong>Output:</strong> {ex.output}</p>
            </div>
          ))}
        </div>

        <div>
          <h2 className="font-semibold">Hints:</h2>
          <ul className="list-disc pl-6 text-sm">
            {question.hints.map((hint, i) => (
              <li key={i}>{hint}</li>
            ))}
          </ul>
        </div>
        {submitted && awardedPoints !== null && (
         <div className="mt-4 w-1/2 p-4 bg-gradient-to-r from-green-100 via-green-50 to-green-100 border-l-4 border-green-500 rounded shadow-md text-green-900">
  <div className="flex items-center gap-3">
   <GiTwoCoins className="text-yellow-500 text-2xl animate-bounce" />
    <div className="text-sm sm:text-base leading-relaxed">
      You just earned <span className="text-green-700 font-bold text-lg">+{awardedPoints}</span> DSA points!
    </div>
  </div>
</div>

        )}

      </section>

      <aside className="lg:w-1/2 w-full space-y-4 bg-white border-l border-gray-200 p-4">
        <label className="block font-medium mb-1 text-sm">Tech Stack:</label>
        <select
          className="w-full border p-2 mb-2 text-sm"
          value={selectedLang}
          onChange={(e) => setSelectedLang(e.target.value)}
        >
          {question.supportedTechStacks.map((stack, i) => (
            <option key={i} value={stack}>{stack}</option>
          ))}
        </select>

        <h3 className="font-semibold text-sm">Your Logic</h3>
        <AceEditor
          mode={languageMap[selectedLang] || "text"}
          theme="monokai"
          value={userLogic}
          onChange={setUserLogic}
          name="user-code-editor"
          editorProps={{ $blockScrolling: true }}
          width="100%"
          height="350px"
          fontSize={16}
        />

        <div className="flex items-center gap-4">
          <button
            onClick={handleRunCode}
            disabled={running}
            className={`mt-4 px-4 py-2 text-white rounded ${running ? "bg-blue-300 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}
          >
            {running ? "Running..." : "Run Code"}
          </button>

          <button
            onClick={handleSubmitSolution}
            disabled={running || !userLogic.trim() || !results.every(r => r.pass)}
            className={`mt-4 px-4 py-2 text-white rounded ${running ? "bg-green-300 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"}`}
          >
            {submitted ? "Submitted" : "Submit Solution"}
          </button>
        </div>

        {results.length > 0 && (
          <div className="bg-gray-100 p-4 text-sm mt-2 rounded shadow-inner max-h-96 overflow-y-auto">
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
                  <p className={`flex items-center gap-2 font-semibold ${r.pass ? "text-green-600" : "text-red-600"}`}>
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
          <div className="bg-black text-green-300 p-2 mt-2 rounded whitespace-pre-wrap max-h-40 overflow-y-auto">
            <h3 className="text-white font-semibold mb-2">Output:</h3>
            <pre>{output}</pre>
          </div>
        )}
      </aside>
    </div>
  );
};

export default DsaSolvePage;