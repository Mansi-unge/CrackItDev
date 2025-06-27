// controllers/dsa/getDsaQuestionById.js
import DsaQuestion from "../../models/DsaQuestion.js";

const getDsaQuestionById = async (req, res) => {
  try {
    const { id } = req.params;
    const question = await DsaQuestion.findById(id);

    if (!question) {
      return res.status(404).json({
        success: false,
        message: "Question not found",
      });
    }

    res.status(200).json({
      success: true,
      question,
    });
  } catch (error) {
    console.error("Error fetching question by ID:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export default getDsaQuestionById;
