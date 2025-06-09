import User from "../models/Users.js";
import MCQQuestion from "../models/MCQQuestion.js";

// Save MCQ Progress
export  const saveMcqProgress = async (req, res) => {
  const { questionId, selectedOption, isCorrect } = req.body;
  const userId = req.user.id;

  try {
    const user = await User.findById(userId);
    const alreadySolved = user.solvedMcqQuestions.find(q => q.questionId === questionId);
    if (alreadySolved) return res.status(400).json({ message: "Already solved" });

    user.solvedMcqQuestions.push({ questionId, selectedOption, isCorrect });
     if (isCorrect) {
      user.points.mcq += 1;
    }
    await user.save();

    res.json({ message: "MCQ progress saved" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Verify MCQ Answer
export  const verifyMcqAnswer = async (req, res) => {
  const { questionId, selectedOption } = req.body;

  try {
    const question = await MCQQuestion.findById(questionId);
    if (!question) return res.status(404).json({ message: "MCQ not found" });

    const isCorrect = question.correctOption === selectedOption;

    res.json({
      isCorrect,
      correctOption: question.correctOption,
      fullAnswer: question.fullAnswer || "",
      answerExplanation: question.answerExplanation || "",
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
