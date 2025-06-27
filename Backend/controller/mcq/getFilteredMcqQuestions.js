import MCQQuestion from "../../models/MCQQuestion.js";

const getFilteredMcqQuestions = async (req, res) => {
  try {
    const {
      tech,
      level,
      topic,
      company,
      _id,
      page = 1,
      pageSize = 15,
    } = req.query;
    const filters = {};

    if (_id) filters._id = _id;
    const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    if (tech) {
      filters.tech = {
        $in: tech
          .split(",")
          .map((t) => new RegExp(`^${escapeRegex(t.trim())}$`, "i")),
      };
    }

    if (level) {
      filters.level = {
        $in: level
          .split(",")
          .map((l) => new RegExp(`^${escapeRegex(l.trim())}$`, "i")),
      };
    }

    if (topic) filters.topic = new RegExp(topic, "i");

    if (company) {
      filters.company = {
        $in: company
          .split(",")
          .map((c) => new RegExp(`^${escapeRegex(c.trim())}$`, "i")),
      };
    }

    const skip = (parseInt(page) - 1) * parseInt(pageSize);
    const questions = await MCQQuestion.aggregate([
      { $match: filters },
      { $sample: { size: parseInt(pageSize) } },
    ]);

    const total = await MCQQuestion.countDocuments(filters);

    res.json({ questions, total });
  } catch (error) {
    console.error("Error fetching MCQ questions:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default getFilteredMcqQuestions;
