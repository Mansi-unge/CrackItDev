import MCQQuestion from "../../models/MCQQuestion.js";

const getMcqById = async (req, res) => {
  try {
    const question = await MCQQuestion.findById(req.params.id);
    if (!question) return res.status(404).json({ error: "MCQ not found" });
    res.json(question);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch question" });
  }
};

export default getMcqById