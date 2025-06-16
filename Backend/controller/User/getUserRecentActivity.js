import User from "../../models/Users.js";

function getRecentActivity(user) {
  const mcqActivities = user.solvedMcqQuestions.map(q => ({
    type: "mcq",
    questionId: q.questionId,
    isCorrect: q.isCorrect,
    selectedOption: q.selectedOption,
    answeredAt: q.answeredAt,
  }));

  const codingActivities = user.solvedCodingQuestions.map(q => ({
    type: "coding",
    questionId: q.questionId,
    isCorrect: q.isCorrect,
    techStack: q.techStack,
    answeredAt: q.answeredAt,
  }));

  const allActivities = [...mcqActivities, ...codingActivities];

  allActivities.sort((a, b) => b.answeredAt - a.answeredAt);

  return allActivities.slice(0, 10);
}

export  const getUserRecentActivity = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);

    if (!user) return res.status(404).json({ message: "User not found" });

    const recentActivity = getRecentActivity(user);
    res.json({ recentActivity });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
