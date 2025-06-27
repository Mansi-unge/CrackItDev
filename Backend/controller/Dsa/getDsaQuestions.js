// controllers/dsa/getDsaQuestions.js
import DsaQuestion from "../../models/DsaQuestion.js";

const getDsaQuestions = async (req, res) => {
  try {
    const { difficulty, topic } = req.query;

    const filter = {};
    if (difficulty) filter.difficulty = difficulty;
    if (topic) filter.topic = topic;

    const questions = await DsaQuestion.find(filter).select(
      "title difficulty topic functionName createdAt"  // added functionName to selection
    );

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
