import CodingQuestion from "../../models/CodingQuestion.js";

const getFilteredCodingQuestions = async (req, res) => {
  try {
    const { tech, level, company, _id } = req.query;
    const filters = {};

    if (_id) filters._id = _id;

    if (tech) {
      filters.tech = { $in: tech.split(",").map((t) => new RegExp(`^${t.trim()}$`, "i")) };
    }

    if (level) {
      filters.level = { $in: level.split(",").map((l) => new RegExp(`^${l.trim()}$`, "i")) };
    }

    if (company) {
      filters.company = { $in: company.split(",").map((c) => new RegExp(`^${c.trim()}$`, "i")) };
    }

    const questions = await CodingQuestion.aggregate([
      { $match: filters },
      { $sample: { size: 1000 } }, // adjust `size` to limit how many random results you want
    ]);

    const total = questions.length;

    res.json({ questions, total });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export default getFilteredCodingQuestions;
