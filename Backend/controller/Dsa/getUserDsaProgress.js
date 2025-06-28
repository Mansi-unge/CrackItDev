  import User from "../../models/Users.js";
  import DsaQuestion from "../../models/DsaQuestion.js";

  const getUserDsaProgress = async (req, res) => {
    try {
      const userId = req.user.id;

      const user = await User.findById(userId).select("solvedDsaQuestions");
      if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
      }

      // Populate question titles for better frontend display
      const detailedSolutions = await Promise.all(
        user.solvedDsaQuestions.map(async (entry) => {
          const question = await DsaQuestion.findById(entry.questionId).select("title");
          return {
            ...entry._doc,
            title: question ? question.title : "Unknown Question",
          };
        })
      );

      // Stats by difficulty
      const difficultyStats = user.solvedDsaQuestions.reduce((acc, q) => {
        acc[q.difficulty] = (acc[q.difficulty] || 0) + 1;
        return acc;
      }, {});

      // Stats by topic
      const topicStats = user.solvedDsaQuestions.reduce((acc, q) => {
        acc[q.topic] = (acc[q.topic] || 0) + 1;
        return acc;
      }, {});

      const totalPoints = user.solvedDsaQuestions.reduce((sum, q) => sum + q.awardedPoints, 0);
const correctCount = user.solvedDsaQuestions.filter(q => q.isCorrect).length;
const totalCount = user.solvedDsaQuestions.length;

   res.status(200).json({
  success: true,
  totalSolved: totalCount,
  correct: correctCount,
  totalPoints,
  difficultyStats,
  topicStats,
  solvedQuestions: detailedSolutions,
});


    } catch (err) {
      console.error("Error fetching DSA progress:", err);
      res.status(500).json({ success: false, message: "Server error" });
    }
  };

  export default getUserDsaProgress;
