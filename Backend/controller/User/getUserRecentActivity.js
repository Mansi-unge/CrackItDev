import User from "../../models/Users.js";

function getRecentActivity(user) {
  const mcqActivities = user.solvedMcqQuestions.map((q) => ({
    type: "mcq",
    questionId: q.questionId,
    isCorrect: q.isCorrect,
    selectedOption: q.selectedOption,
    topic: q.topic || "General",
    techstack: q.techstack || "Unknown",
    answeredAt: q.answeredAt,
  }));

  const codingActivities = user.solvedCodingQuestions.map((q) => ({
    type: "coding",
    questionId: q.questionId,
    isCorrect: q.isCorrect,
    techStack: q.techStack || "Unknown",
    topic: q.topic || "General",
    answeredAt: q.answeredAt,
  }));

  const dsaActivities = user.solvedDsaQuestions.map((q) => ({
    type: "dsa",
    questionId: q.questionId,
    isCorrect: q.isCorrect,
    techStack: q.techStack || "Unknown",
    topic: q.topic || "General",
    difficulty: q.difficulty,
    answeredAt: q.answeredAt,
  }));

  const allActivities = [...mcqActivities, ...codingActivities, ...dsaActivities];
  allActivities.sort((a, b) => new Date(b.answeredAt) - new Date(a.answeredAt));

  return allActivities.slice(0, 4); // latest 6
}



export const getUserRecentActivity = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId).lean(); // lean gives plain JS object

    if (!user) return res.status(404).json({ message: "User not found" });

    const recentActivity = getRecentActivity(user);
    res.json({ recentActivity });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

