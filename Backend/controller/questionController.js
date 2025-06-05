// import Question from '../models/Question.js';
import Question from "../models/Questions.js";

// export const getFilteredQuestions = async (req, res) => {
//   try {
//     const { tech, level, type, company, page = 1, pageSize = 15 } = req.query;
//     const filters = {};

//     if (tech) filters.tech = { $in: tech.split(',') };
//     if (level) filters.level = { $in: level.split(',') };
//     if (type) filters.type = { $in: type.split(',') };
//     if (company) filters.company = { $in: company.split(',') };

//     const skip = (parseInt(page) - 1) * parseInt(pageSize);

//     const questions = await Question.find(filters)
//       .sort({ createdAt: -1 })
//       .skip(skip)
//       .limit(parseInt(pageSize));

//     const total = await Question.countDocuments(filters);

//     res.json({ questions, total });
//   } catch (error) {
//     console.error("Error fetching questions:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

export const getFilteredQuestions = async (req, res) => {
  try {
    const {
      tech,
      level,
      type,
      company,
      _id,
      page = 1,
      pageSize = 15,
    } = req.query;
    const filters = {};

    if (_id) filters._id = _id;

    if (tech) {
      filters.tech = {
        $in: tech.split(",").map((t) => new RegExp(`^${t.trim()}$`, "i")),
      };
    }

    if (level) {
      filters.level = {
        $in: level.split(",").map((l) => new RegExp(`^${l.trim()}$`, "i")),
      };
    }

    if (type) {
      filters.type = {
        $in: type.split(",").map((t) => new RegExp(`^${t.trim()}$`, "i")),
      };
      const isMCQOnly = type
        .split(",")
        .every((t) => t.trim().toLowerCase() === "mcq");
      if (isMCQOnly) {
        filters.options = { $exists: true, $not: { $size: 0 } };
      }
    }

    if (company) {
      filters.company = {
        $in: company.split(",").map((c) => new RegExp(`^${c.trim()}$`, "i")),
      };
    }

    // ✅ Fetch only questions that have options (MCQs)
    filters.options = { $exists: true, $not: { $size: 0 } };

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
export const verifyAnswer = async (req, res) => {
  const { questionId, selectedOption } = req.body;

  try {
    const question = await Question.findById(questionId);
    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }

    const isCorrect = question.correctOption === selectedOption;

    res.json({
      isCorrect,
      correctOption: question.correctOption,
      fullAnswer: question.fullAnswer || "",
    });
  } catch (err) {
    console.error("Error verifying answer:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getQuestionById = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    if (!question) return res.status(404).json({ error: "Question not found" });
    res.json(question);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch question" });
  }
};

export const createQuestion = async (req, res) => {
  try {
    const newQuestion = new Question(req.body);
    await newQuestion.save();
    res.status(201).json(newQuestion);
  } catch (error) {
    console.error("Error creating question:", error);
    res.status(500).json({ error: "Failed to create question" });
  }
};
