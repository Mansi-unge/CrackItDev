import User from "../../models/Users.js";

const saveMcqProgress = async (req, res) => {
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
    res.json({ message: "MCQ progress saved", points: user.points.mcq });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export default saveMcqProgress
