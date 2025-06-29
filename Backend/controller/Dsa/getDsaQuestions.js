import DsaQuestion from "../../models/DsaQuestion.js";

const getDsaQuestions = async (req, res) => {
  try {
    const { difficulty, topic } = req.query;

    const matchStage = {};
    if (difficulty) matchStage.difficulty = difficulty;
    if (topic) matchStage.topic = topic;

    // Count total matching docs
    const total = await DsaQuestion.countDocuments(matchStage);

    const pipeline = [
      { $match: matchStage },
      { $sample: { size: total } }, // fetch all matching docs in random order
      {
        $project: {
          title: 1,
          difficulty: 1,
          topic: 1,
          functionName: 1,
          createdAt: 1,
        },
      },
    ];

    const questions = await DsaQuestion.aggregate(pipeline);

    res.status(200).json({
      success: true,
      questions,
    });
  } catch (error) {
    console.error("Error fetching DSA questions:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error while fetching questions",
    });
  }
};

export default getDsaQuestions;
