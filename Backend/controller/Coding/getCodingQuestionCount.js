import CodingQuestion from "../../models/CodingQuestion.js";

const getCodingQuestionCount = async (req, res) => {
  const { tech } = req.query;
  try {
    const count = await CodingQuestion.countDocuments({
      tech: new RegExp(`^${tech}$`, "i"), // case-insensitive match
    });
    res.json({ count });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch question count" });
  }
};

export default getCodingQuestionCount;