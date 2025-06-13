// controllers/MCQController.js
import User from "../models/Users.js";
import MCQQuestion from "../models/MCQQuestion.js";

// Save MCQ Progress
export const saveMcqProgress = async (req, res) => {
  const { questionId, selectedOption, isCorrect, explanation } = req.body;
  const userId = req.user.id;

  try {
    const user = await User.findById(userId);
    const alreadySolved = user.solvedMcqQuestions.find(q => q.questionId === questionId);
    if (alreadySolved) return res.status(400).json({ message: "Already solved" });

    user.solvedMcqQuestions.push({
      questionId,
      selectedOption,
      isCorrect,
      explanation: explanation || "No explanation available.",
    });

    if (isCorrect) {
      user.points.mcq += 1;
    }

    await user.save();

    // ✅ Return updated points for frontend to show
    res.json({ message: "MCQ progress saved", points: user.points.mcq });
  } catch (err) {
    console.error("Save MCQ Progress Error:", err);
    res.status(500).json({ error: err.message });
  }
};

// Verify MCQ Answer
export const verifyMcqAnswer = async (req, res) => {
  const { questionId, selectedOption } = req.body;

  try {
    const question = await MCQQuestion.findById(questionId);
    if (!question) return res.status(404).json({ message: "MCQ not found" });

    const isCorrect = question.correctOption === selectedOption;

    res.json({
      isCorrect,
      correctOption: question.correctOption,
      fullAnswer: question.fullAnswer || "",
      answerExplanation: question.answerExplanation || "No explanation available.",
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get MCQ Progress
export const getMcqProgress = async (req, res) => {
  const userId = req.user.id;

  try {
    const user = await User.findById(userId);

    res.json({
      solvedMcqQuestions: user.solvedMcqQuestions || [],
      points: user.points?.mcq || 0,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
