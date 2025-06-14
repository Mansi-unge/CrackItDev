import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  fetchQuestionById,
  fetchUserProgress,
  runCodeOnJudge0,
  submitSolutionToBackend,
  submitTestCaseOnJudge0,
  normalizeText,
  insertUserLogic,
} from "../../services/challenges/challengeService";

const useChallengeHook = () => {
  const { id } = useParams();
  const [question, setQuestion] = useState(null);
  const [code, setCode] = useState("");
  const [userLogic, setUserLogic] = useState("// Write your logic here\n");
  const [output, setOutput] = useState("");
  const [badgeEarned, setBadgeEarned] = useState(false);
  const [results, setResults] = useState([]);
  const [running, setRunning] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(false);

  useEffect(() => {
    if (!id) return;
    fetchQuestionById(id).then((res) => {
      setQuestion(res);
      setCode(res.codeTemplate || "");
      setUserLogic("// Write your logic here\n");
      setOutput("");
      setBadgeEarned(false);
      setResults([]);
    });

    const token = localStorage.getItem("token");
    if (token) {
      setLoadingProgress(true);
      fetchUserProgress(token)
        .then((res) => {
          const solved = res.solvedCodingQuestions || [];
          const solvedQuestion = solved.find((q) => q.questionId.toString() === id);
          if (solvedQuestion && solvedQuestion.isCorrect) {
            setBadgeEarned(true);
            setUserLogic(solvedQuestion.submittedCode);
          }
        })
        .catch(console.error)
        .finally(() => setLoadingProgress(false));
    }
  }, [id]);

  const runCode = useCallback(async () => {
    if (!question) return;
    setRunning(true);
    setOutput("Running code...");
    try {
      const lang = question.tech;
      const finalCode = insertUserLogic(code, userLogic);
      const runResult = await runCodeOnJudge0(lang, finalCode, question.sampleInput || "");
      setOutput(runResult);
    } catch (error) {
      setOutput("Error running code: " + error.message);
    } finally {
      setRunning(false);
    }
  }, [code, userLogic, question]);

  const handleSubmit = async () => {
    if (!question) return;
    setSubmitting(true);
    setResults([]);
    setOutput("Submitting and validating...");

    try {
      const token = localStorage.getItem("token");
      const lang = question.tech;
      const finalCode = insertUserLogic(code, userLogic);
      let passedCount = 0;
      const testResults = [];

      for (const testCase of question.testCases) {
        const data = await submitTestCaseOnJudge0(lang, finalCode, testCase.input);
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
      }

      setResults(testResults);
      setOutput(`${passedCount} / ${question.testCases.length} test cases passed`);

      if (passedCount === question.testCases.length) {
        try {
          await submitSolutionToBackend(token, question, finalCode);
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

  return {
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
  };
};

export default useChallengeHook
