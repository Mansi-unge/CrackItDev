// controller/mcq/getSolvedMcqQuestions.js
import MCQQuestion from "../../models/MCQQuestion.js";

const getSolvedMcqQuestions = async (req, res) => {
  try {
    const { ids } = req.body; // array of _ids
    const questions = await MCQQuestion.find({ _id: { $in: ids } });
    res.json({ questions });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch solved questions." });
  }
};

export default getSolvedMcqQuestions;
