import MCQQuestion from "../../models/MCQQuestion.js";

const createMcqQuestion = async (req, res) => {
  try {
    const newQuestion = new MCQQuestion(req.body);
    await newQuestion.save();
    res.status(201).json(newQuestion);
  } catch (error) {
    console.error("Error creating MCQ:", error);
    res.status(500).json({ error: "Failed to create MCQ question" });
  }
};
export default createMcqQuestion
