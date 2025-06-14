import User from "../../models/Users.js";
import CodingQuestion from "../../models/CodingQuestion.js";

const saveCodingProgress = async (req, res) => {
  const { questionId, submittedCode, isCorrect, techStack, isDailyChallenge } = req.body;
  const userId = req.user.id;

  try {
    const user = await User.findById(userId);
    const alreadySolved = user.solvedCodingQuestions.find(
      (q) => q.questionId.toString() === questionId
    );
    if (alreadySolved) return res.status(400).json({ message: "Already solved" });

    user.solvedCodingQuestions.push({ questionId, submittedCode, isCorrect, techStack, isDailyChallenge });

    const correctSolved = user.solvedCodingQuestions.filter((q) => q.isCorrect);
    const correctSolvedInTech = correctSolved.filter((q) => q.techStack === techStack);

    if (!user.badges.bronze && correctSolved.length === 1) user.badges.bronze = true;
    if (!user.badges.silver && correctSolved.length >= 5) user.badges.silver = true;

    const totalTechQuestions = await CodingQuestion.countDocuments({ tech: techStack });
    if (!user.badges.golden && correctSolvedInTech.length >= totalTechQuestions)
      user.badges.golden = true;

    await user.save();
    res.json({ message: "Coding progress saved and badges updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export default saveCodingProgress
