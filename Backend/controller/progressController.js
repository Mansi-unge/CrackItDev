import User  from "../models/Users.js";
import Question from "../models/Questions.js";

// MCQ Progress Save
export const saveMcqProgress = async (req, res) => {
  const { questionId, selectedOption, isCorrect } = req.body;
  const userId = req.user.id;

  try {
    const user = await User.findById(userId);

    // Prevent resubmission
    const alreadySolved = user.solvedMcqQuestions.find(q => q.questionId === questionId);
    if (alreadySolved) return res.status(400).json({ message: "Already solved" });

    user.solvedMcqQuestions.push({ questionId, selectedOption, isCorrect });
    user.points.mcq += 1; // 1 point per MCQ regardless

    await user.save();
    res.json({ message: "MCQ progress saved" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Coding Progress Save
export const saveCodingProgress = async (req, res) => {
  const { questionId, submittedCode, isCorrect, techStack, isDailyChallenge } = req.body;
  const userId = req.user.id;

  try {
    const user = await User.findById(userId);

    const alreadySolved = user.solvedCodingQuestions.find(q => q.questionId === questionId);
    if (alreadySolved) return res.status(400).json({ message: "Already solved" });

    user.solvedCodingQuestions.push({
      questionId,
      submittedCode,
      isCorrect,
      techStack,
      isDailyChallenge,
    });

    // Add silver badge for each solved coding
    if (isCorrect) {
      user.badges.silver.push(questionId);

      // Check if all questions of a tech stack are solved (gold badge)
      const totalTechQuestions = await Question.countDocuments({ type: "Coding", tech: techStack });
      const userTechSolved = user.solvedCodingQuestions.filter(q => q.techStack === techStack && q.isCorrect);
      if (userTechSolved.length === totalTechQuestions && !user.badges.gold.includes(techStack)) {
        user.badges.gold.push(techStack);
      }
    }

    await user.save();
    res.json({ message: "Coding progress saved" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Rapid Fire Save & Streak Logic
export const saveRapidFireProgress = async (req, res) => {
  const { questionId, success } = req.body;
  const userId = req.user.id;

  try {
    const user = await User.findById(userId);

    const today = new Date().toISOString().split("T")[0];
    const last = user.streak.lastCompletedDate?.toISOString().split("T")[0];

    if (last === today) return res.status(400).json({ message: "Already completed today" });

    user.solvedRapidFireQuestions.push({ questionId, success });

    if (last === getYesterdayDate()) {
      user.streak.current += 1;
    } else {
      user.streak.current = 1; // restart streak
    }

    user.streak.lastCompletedDate = new Date();
    if (user.streak.current > user.streak.max) {
      user.streak.max = user.streak.current;
    }

    await user.save();
    res.json({ message: "Rapid Fire saved", streak: user.streak });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getYesterdayDate = () => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return yesterday.toISOString().split("T")[0];
};

// Fetch All User Progress
export const getUserProgress = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("solvedMcqQuestions solvedCodingQuestions solvedRapidFireQuestions points streak badges");
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
