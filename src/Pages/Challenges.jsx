import React, { useState } from "react";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-monokai";

const sampleProblem = {
  id: "001",
  title: "Two Sum",
  description:
    "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
  examples: [
    {
      input: "nums = [2, 7, 11, 15], target = 9",
      output: "[0, 1]",
    },
  ],
  constraints: [
    "Each input would have exactly one solution.",
    "You may not use the same element twice.",
  ],
  hints: ["Use a hash map to store complement values."],
  starterCode: `function twoSum(nums, target) {\n  // Your code here\n}`,
  testCases: [
    {
      input: [[2, 7, 11, 15], 9],
      expected: [0, 1],
    },
  ],
};

const Challenge = () => {
  const [code, setCode] = useState(sampleProblem.starterCode);
  const [showHint, setShowHint] = useState(false);
  const [output, setOutput] = useState(null);
  const [testResult, setTestResult] = useState(null);

  const runCode = () => {
    // Simulate testing (mock behavior, replace with Judge0 API in production)
    try {
      const userFunc = new Function("nums", "target", code + "; return twoSum(nums, target);");
      const result = userFunc(...sampleProblem.testCases[0].input);
      setOutput(JSON.stringify(result));

      if (JSON.stringify(result) === JSON.stringify(sampleProblem.testCases[0].expected)) {
        setTestResult("✅ Test Passed! You earned a badge!");
      } else {
        setTestResult("❌ Test Failed. Try again.");
      }
    } catch (error) {
      setOutput("Error: " + error.message);
      setTestResult("❌ Code Error");
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-indigo-600 mb-4">Today's Coding Challenge</h1>
      <div className="bg-white shadow-lg p-6 rounded-xl border mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">{sampleProblem.title}</h2>
        <p className="text-gray-700 mb-3">{sampleProblem.description}</p>

        <div className="mb-3">
          <strong>Example:</strong>
          <pre className="bg-gray-100 rounded-md p-2 mt-1">
            Input: {sampleProblem.examples[0].input}
            Output: {sampleProblem.examples[0].output}
          </pre>
        </div>

        <div className="mb-3">
          <strong>Constraints:</strong>
          <ul className="list-disc pl-6">
            {sampleProblem.constraints.map((c, idx) => (
              <li key={idx}>{c}</li>
            ))}
          </ul>
        </div>

        <div className="mb-3">
          <button
            className="bg-yellow-500 text-white px-4 py-2 rounded-xl hover:bg-yellow-600"
            onClick={() => setShowHint(!showHint)}
          >
            {showHint ? "Hide Hint" : "Show Hint"}
          </button>
          {showHint && <p className="mt-2 text-blue-500">💡 {sampleProblem.hints[0]}</p>}
        </div>
      </div>

      <div className="mb-6">
        <AceEditor
          mode="javascript"
          theme="monokai"
          name="editor"
          width="100%"
          height="400px"
          fontSize={14}
          value={code}
          onChange={(val) => setCode(val)}
          editorProps={{ $blockScrolling: true }}
        />
        <button
          className="mt-4 bg-indigo-600 text-white px-6 py-2 rounded-xl hover:bg-indigo-700"
          onClick={runCode}
        >
          Run Code
        </button>
      </div>

      {output !== null && (
        <div className="bg-gray-100 p-4 rounded-xl">
          <p className="font-semibold">Output:</p>
          <pre className="text-sm text-gray-800">{output}</pre>
          <p className="mt-2 text-green-600 font-semibold">{testResult}</p>
        </div>
      )}
    </div>
  );
};

export default Challenge;
