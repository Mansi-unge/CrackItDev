import User from "../models/Users.js";
import CodingQuestion from "../models/CodingQuestion.js";

export const saveCodingProgress = async (req, res) => {
  const { questionId, submittedCode, isCorrect, techStack, isDailyChallenge } = req.body;
  const userId = req.user.id;

  try {
    const user = await User.findById(userId);
    const alreadySolved = user.solvedCodingQuestions.find(
      (q) => q.questionId.toString() === questionId
    );

    if (alreadySolved) return res.status(400).json({ message: "Already solved" });

    // Add question progress
    user.solvedCodingQuestions.push({ questionId, submittedCode, isCorrect, techStack, isDailyChallenge });

    // ✅ Award badges
    const correctSolved = user.solvedCodingQuestions.filter((q) => q.isCorrect);
    const correctSolvedInTech = correctSolved.filter((q) => q.techStack === techStack);

    // 🥉 Bronze - first solved coding question
    if (!user.badges.bronze && correctSolved.length === 1) {
      user.badges.bronze = true;
    }

    // 🥈 Silver - for each correct question (if not already added)
    if (isCorrect && !user.badges.silver.includes(questionId)) {
      user.badges.silver.push(questionId);
    }

    // 🥇 Gold - all questions of a tech stack completed
    const totalTechQuestions = await CodingQuestion.countDocuments({ tech: techStack });
    if (
      correctSolvedInTech.length === totalTechQuestions &&
      !user.badges.gold.includes(techStack)
    ) {
      user.badges.gold.push(techStack);
    }

    await user.save();
    res.json({ message: "Coding progress saved and badges updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
