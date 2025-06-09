import Question from "../models/Question.js"; // base schema with discriminator
import User from "../models/Users.js";

export const getFilteredQuestions = async (req, res) => {
  try {
    const { tech, level, type, company, _id, page = 1, pageSize = 15 } = req.query;
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

    // agar type nahi diya to default "MCQ" lagao
    const typeArray = type ? type.split(",").map(t => t.trim()) : ["MCQ"];
    filters.type = {
      $in: typeArray.map(t => new RegExp(`^${t}$`, "i")),
    };

    // Agar sirf MCQ hi ho to options field check karo
    const isMCQOnly = typeArray.length === 1 && typeArray[0].toLowerCase() === "mcq";
    if (isMCQOnly) {
      filters.options = { $exists: true, $not: { $size: 0 } };
    }

    if (company) {
      filters.company = {
        $in: company.split(",").map((c) => new RegExp(`^${c.trim()}$`, "i")),
      };
    }

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


export const getUserProgress = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("solvedMcqQuestions solvedCodingQuestions solvedRapidFireQuestions points streak badges");
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
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