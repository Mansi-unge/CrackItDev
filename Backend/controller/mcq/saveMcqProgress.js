import User from "../../models/Users.js";
import MCQQuestion from "../../models/MCQQuestion.js";


const saveMcqProgress = async (req, res) => {
  const { questionId, selectedOption, isCorrect, explanation, topic } = req.body;
  const userId = req.user.id;

  try {
    const user = await User.findById(userId);
    const alreadySolved = user.solvedMcqQuestions.find(q => q.questionId === questionId);
    if (alreadySolved) return res.status(400).json({ message: "Already solved" });

    // ✅ Fetch the MCQ question to get the tech stack
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
    res.json({ message: "MCQ progress saved", points: user.points.mcq });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export default saveMcqProgress
