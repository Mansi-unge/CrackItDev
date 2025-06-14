import CodingQuestion from "../../models/CodingQuestion.js";

const createCodingQuestion = async (req, res) => {
  try {
    const newQuestion = new CodingQuestion(req.body);
    await newQuestion.save();
    res.status(201).json(newQuestion);
  } catch (error) {
    res.status(500).json({ error: "Failed to create coding question" });
  }
};

export default createCodingQuestion
