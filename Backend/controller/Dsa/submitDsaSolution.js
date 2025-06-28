import User from "../../models/Users.js";
import DsaQuestion from "../../models/DsaQuestion.js";
import UserActivity from "../../models/UserActivity.js";

const submitDsaSolution = async (req, res) => {
  try {
    const { questionId, submittedCode, techStack } = req.body;
    const userId = req.user.id;

    const question = await DsaQuestion.findById(questionId);
    if (!question) {
      return res.status(404).json({ success: false, message: "DSA Question not found" });
    }

    let awardedPoints = 0;
    switch (question.difficulty) {
      case "Easy":
        awardedPoints = 10;
        break;
      case "Medium":
        awardedPoints = 20;
        break;
      case "Hard":
        awardedPoints = 30;
        break;
      default:
        awardedPoints = 10;
    }

    const newEntry = {
      questionId,
      submittedCode,
      techStack,
      topic: question.topic,
      difficulty: question.difficulty,
      isCorrect: true,
      awardedPoints,
    };

    const user = await User.findByIdAndUpdate(
      userId,
      {
        $addToSet: { solvedDsaQuestions: newEntry },
        $inc: { "points.dsa": awardedPoints }
      },
      { new: true }
    ).select("points");

    // ✅ Log user activity (after saving progress)
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);

    await UserActivity.findOneAndUpdate(
      { userId, date: today, activityType: "DSA" },
      { $inc: { count: 1 } },
      { upsert: true, new: true }
    );

    res.status(200).json({
      success: true,
      message: `Solution submitted! +${awardedPoints} points awarded.`,
      updatedPoints: user.points,
    });

  } catch (error) {
    console.error("Error submitting solution:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export default submitDsaSolution;
