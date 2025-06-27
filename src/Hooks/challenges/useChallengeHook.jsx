import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  fetchQuestionById,
  fetchUserProgress,
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

    fetchQuestionById(id)
      .then((res) => {
        setQuestion(res);
        setCode(res.codeTemplate || "");
        setUserLogic("// Write your logic here\n");
        setOutput("");
        setBadgeEarned(false);
        setResults([]);
      })
      .catch(() => toast.error("Failed to load challenge details"));

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
        .catch(() => toast.error("Failed to load your progress"))
        .finally(() => setLoadingProgress(false));
    }
  }, [id]);

  const runCode = useCallback(async () => {
    if (!question) return;
    setRunning(true);
    setOutput("Running and validating test cases...");
    setResults([]);

    try {
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
      toast.info(`${passedCount} / ${question.testCases.length} test cases passed`);
      setOutput(`${passedCount} / ${question.testCases.length} test cases passed`);
    } catch (error) {
      setOutput("Error running test cases: " + error.message);
      toast.error("Failed to run code. Please try again.");
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

        // Only toast here (badge earned)
        setBadgeEarned(true);
        toast.success("🏅 Congratulations! You've earned a badge for solving this challenge!");
      } catch (error) {
        if (error.response?.data?.message === "Already solved") {
          toast.info("✅ You’ve already solved this challenge.");
        } else {
          console.error("Error saving progress:", error);
          toast.error("❌ Something went wrong while saving your progress.");
        }
      }
    } else {
      // Warn only if not all test cases passed
      toast.warning(`⚠️ Only ${passedCount} / ${question.testCases.length} passed. Try again.`);
    }
  } catch (error) {
    toast.error("❌ Failed to submit code. Please try again.");
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

export default useChallengeHook;
