import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import confetti from "canvas-confetti";
import {
  fetchDsaQuestionByIdService,
  fetchUserDsaSolutionService,
  submitDsaSolutionService,
} from "../../services/Dsa/dsaSolveService";
import { submitCodeToJudge0 } from "../../services/Dsa/dsaeditorService";
import { toast } from "react-toastify";

const useDsaSolve = () => {
  const { id } = useParams();
  const [question, setQuestion] = useState(null);
  const [selectedLang, setSelectedLang] = useState("Java");
  const [userLogic, setUserLogic] = useState("");
  const [results, setResults] = useState([]);
  const [output, setOutput] = useState("");
  const [running, setRunning] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [awardedPoints, setAwardedPoints] = useState(null);
  const [totalDsaPoints, setTotalDsaPoints] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const q = await fetchDsaQuestionByIdService(id);
        setQuestion(q);
        setSelectedLang(q.supportedTechStacks?.[0] || "Java");

        const solution = await fetchUserDsaSolutionService(id);
        if (solution) {
          setUserLogic(solution.submittedCode || "");
          setSubmitted(true);
          setSelectedLang(solution.techStack || q.supportedTechStacks?.[0]);

          if (solution.awardedPoints != null) {
            setAwardedPoints(solution.awardedPoints);
          }

          // Optionally fetch total points (or retain it if already updated after submission)
          const token = localStorage.getItem("token");
          if (token) {
            const { data } = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/users/me`, {
              headers: { Authorization: `Bearer ${token}` },
            });
            setTotalDsaPoints(data.points?.dsa || 0);
          }
        }

      } catch (err) {
        console.error("Error loading question or user solution:", err);
      }
    };

    fetchData();
  }, [id]);

  const handleRunCode = async () => {
    setRunning(true);
    setResults([]);
    setOutput("");

    try {
      const res = await submitCodeToJudge0({
        sourceCode: userLogic,
        language: selectedLang,
        testCases: question.testCases,
      });
      setResults(res.results);
      setOutput(res.stdout);
    } catch (err) {
      console.error("Execution error:", err);
      setOutput("Error during code execution.");
    }

    setRunning(false);
  };

  const handleSubmitSolution = async () => {
    try {
      const response = await submitDsaSolutionService({
        questionId: question._id,
        submittedCode: userLogic,
        techStack: selectedLang,
      });

      if (response.success) {
        toast.success(response.message); // shows "+10/20/30 points awarded"
        setSubmitted(true);
        setAwardedPoints(response.updatedPoints?.dsa - (totalDsaPoints ?? 0));
        setTotalDsaPoints(response.updatedPoints?.dsa);
              confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.6 },
      });

      } else {
        toast.error("Submission failed.");
      }
    } catch (err) {
      console.error("Submission error:", err);
      toast.error("Something went wrong during submission.");
    }
  };

  return {
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
  };
};

export default useDsaSolve;
