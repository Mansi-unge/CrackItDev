import axios from "axios";

export const submitCodeToJudge0 = async ({ sourceCode, language, testCases }) => {
  const langMap = {
    Java: 62,
    Python: 71,
    C: 50,
    "C++": 54,
    JavaScript: 63,
  };

  const results = [];

  for (let tc of testCases) {
    const res = await axios.post(
      "https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true",
      {
        source_code: sourceCode,
        stdin: tc.input,
        expected_output: tc.output,
        language_id: langMap[language],
      },
      {
        headers: {
          "Content-Type": "application/json",
          "X-RapidAPI-Key": import.meta.env.VITE_RAPIDAPI_KEY,
          "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
        },
      }
    );

    results.push({
      input: tc.input,
      expected: tc.output,
      actual: res.data.stdout?.trim() || "",
      pass: res.data.status?.description === "Accepted",
    });
  }

  return {
    results,
    stdout: results.map((r, i) => `Case ${i + 1}: ${r.pass ? "✅" : "❌"}`).join("\n"),
  };
};
