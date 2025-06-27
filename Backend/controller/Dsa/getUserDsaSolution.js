import User from "../../models/Users.js";

const getUserDsaSolution = async (req, res) => {
  try {
    const userId = req.user.id;
    const questionId = req.params.id;

    // Fetch only solved DSA questions
    const user = await User.findById(userId).select("solvedDsaQuestions");

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Convert ObjectId to string for safe comparison
    const solution = user.solvedDsaQuestions.find(
      (entry) => entry.questionId.toString() === questionId
    );

    if (!solution) {
      return res.status(200).json({ success: true, solution: null });
    }

    // Return only the relevant solution fields
    return res.status(200).json({
      success: true,
      solution: {
        submittedCode: solution.submittedCode,
        isCorrect: solution.isCorrect,
        techStack: solution.techStack,
        topic: solution.topic,
        difficulty: solution.difficulty,
        answeredAt: solution.answeredAt,
        awardedPoints: solution.awardedPoints, // ✅ reflects dynamic points (10/20/30)
      },
    });
  } catch (error) {
    console.error("Error fetching user solution:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export default getUserDsaSolution;
