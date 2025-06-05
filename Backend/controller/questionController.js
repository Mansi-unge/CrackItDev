// import Question from '../models/Question.js';
import Question from "../models/Questions.js";

export const getFilteredQuestions = async (req, res) => {
  try {
    const { tech, level, type, company, page = 1, pageSize = 15 } = req.query;
    const filters = {};

    if (tech) filters.tech = { $in: tech.split(',') };
    if (level) filters.level = { $in: level.split(',') };
    if (type) filters.type = { $in: type.split(',') };
    if (company) filters.company = { $in: company.split(',') };

    const skip = (parseInt(page) - 1) * parseInt(pageSize);

    const questions = await Question.find(filters)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(pageSize));

    const total = await Question.countDocuments(filters);

    res.json({ questions, total });
  } catch (error) {
    console.error("Error fetching questions:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};



export const createQuestion = async (req, res) => {
  try {
    const newQuestion = new Question(req.body);
    await newQuestion.save();
    res.status(201).json(newQuestion);
  } catch (error) {
    console.error("Error creating question:", error);
    res.status(500).json({ error: 'Failed to create question' });
  }
};
