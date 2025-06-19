import User from "../../models/Users.js";

function getRecentActivity(user) {
  const mcqActivities = user.solvedMcqQuestions.map(q => ({
    type: "mcq",
    questionId: q.questionId,
    isCorrect: q.isCorrect,
    selectedOption: q.selectedOption,
    topic: q.topic || "General", // Fallback if null
    techstack: q.techstack || "Unknown",
    answeredAt: q.answeredAt,
  }));

  const codingActivities = user.solvedCodingQuestions.map(q => ({
    type: "coding",
    questionId: q.questionId,
    isCorrect: q.isCorrect,
    techStack: q.techStack || "Unknown",
    topic: q.topic || "General",
    answeredAt: q.answeredAt,
  }));

  const allActivities = [...mcqActivities, ...codingActivities];
  allActivities.sort((a, b) => b.answeredAt - a.answeredAt);

  return allActivities.slice(0, 6);
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

