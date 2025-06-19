import User from "../../models/Users.js";
import CodingQuestion from "../../models/CodingQuestion.js";

const saveCodingProgress = async (req, res) => {
  const { questionId, submittedCode, isCorrect, techStack, topic, isDailyChallenge } = req.body;
  const userId = req.user.id;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const alreadySolved = user.solvedCodingQuestions.find(q => q.questionId === questionId);
    if (alreadySolved) return res.status(400).json({ message: "Already solved" });

    if (!user.badges) {
      user.badges = { bronze: 0, silver: 0, golden: 0 };
    }

    user.solvedCodingQuestions.push({
      questionId,
      submittedCode,
      isCorrect,
      techStack,
      topic,
      isDailyChallenge,
    });

    if (isCorrect) {
  user.points.coding = (user.points.coding || 0) + 5;

  const correctSolved = user.solvedCodingQuestions.filter(q => q.isCorrect);
  const correctInTech = correctSolved.filter(q => q.techStack === techStack);
  const totalTechQuestions = await CodingQuestion.countDocuments({ tech: techStack });

  user.badges.bronze += 1;

  if (correctSolved.length % 5 === 0) user.badges.silver += 1;
  if (correctInTech.length === totalTechQuestions && user.badges.golden < 1) {
    user.badges.golden += 1;
  }
}


    await user.save();
    res.json({ message: "Coding progress saved and badges updated" });

  } catch (err) {
    console.error("Error saving coding progress:", err);
    res.status(500).json({ error: err.message });
  }
};

export default saveCodingProgress;
