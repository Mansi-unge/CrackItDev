import CodingQuestion from "../../models/CodingQuestion.js";

const getCodingQuestionById = async (req, res) => {
  try {
    const question = await CodingQuestion.findById(req.params.id);
    if (!question) return res.status(404).json({ error: "Question not found" });
    res.json(question);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch question" });
  }
};

export default getCodingQuestionById
