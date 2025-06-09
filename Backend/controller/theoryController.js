import TheoryQuestion from "../models/TheoryQuestion.js";

export const createTheoryQuestion = async (req, res) => {
  try {
    const newQuestion = new TheoryQuestion(req.body);
    await newQuestion.save();
    res.status(201).json(newQuestion);
  } catch (error) {
    res.status(500).json({ error: "Failed to create theory question" });
  }
};
