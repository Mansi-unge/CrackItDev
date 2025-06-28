import User from "../../models/Users.js";
import MCQQuestion from "../../models/MCQQuestion.js";
import UserActivity from "../../models/UserActivity.js";

const saveMcqProgress = async (req, res) => {
  const { questionId, selectedOption, isCorrect, explanation, topic } = req.body;
  const userId = req.user.id;

  try {
    const user = await User.findById(userId);
    const alreadySolved = user.solvedMcqQuestions.find(q => q.questionId === questionId);
    if (alreadySolved) return res.status(400).json({ message: "Already solved" });

    const mcqQuestion = await MCQQuestion.findById(questionId);
    if (!mcqQuestion) return res.status(404).json({ message: "Question not found" });

    user.solvedMcqQuestions.push({
      questionId,
      selectedOption,
      isCorrect,
      explanation: explanation || mcqQuestion.answerExplanation || "No explanation available.",
      techstack: mcqQuestion.tech,
      topic: topic || mcqQuestion.topic,
    });

    if (isCorrect) {
      user.points.mcq += 1;
    }

    await user.save();

    // ✅ Log user activity (after saving)
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);

    await UserActivity.findOneAndUpdate(
      { userId, date: today, activityType: "MCQ" },
      { $inc: { count: 1 } },
      { upsert: true, new: true }
    );

    res.json({ message: "MCQ progress saved", points: user.points.mcq });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export default saveMcqProgress;
