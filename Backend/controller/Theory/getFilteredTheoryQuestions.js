import TheoryQuestion from "../../models/TheoryQuestion.js";

 const getFilteredTheoryQuestions = async (req, res) => {
  try {
    const { tech, level, type, company, page = 1, pageSize = 15 } = req.query;

    const filter = {};
    if (tech) {
  filter.tech = {
    $in: tech.split(",").map(t => new RegExp(`^${t.trim()}$`, "i")),
  };
}

    if (level) filter.level = { $in: level.split(",") };
    if (type) filter.type = { $in: type.split(",") };
    if (company) filter.company = { $in: company.split(",") };

    const skip = (Number(page) - 1) * Number(pageSize);
      const questions = await TheoryQuestion.aggregate([
            { $match: filter },
            { $sample: { size: parseInt(pageSize) } },
          ]);

    const total = await TheoryQuestion.countDocuments(filter);

    res.status(200).json({ questions, total });
  } catch (err) {
    console.error("Error fetching theory questions:", err);
    res.status(500).json({ error: "Failed to fetch questions" });
  }
};

export default getFilteredTheoryQuestions