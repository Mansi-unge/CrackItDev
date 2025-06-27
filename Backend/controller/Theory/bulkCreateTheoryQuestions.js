import TheoryQuestion from "../../models/TheoryQuestion.js";

const bulkCreateTheoryQuestions = async (req, res) => {
  try {
    const questions = req.body;

    if (!Array.isArray(questions)) {
      return res.status(400).json({ error: "Input must be an array of questions" });
    }

    const inserted = await TheoryQuestion.insertMany(questions);
    res.status(201).json({ message: "Questions inserted successfully", insertedCount: inserted.length });
  } catch (error) {
    console.error("Bulk insert error:", error);
    res.status(500).json({ error: "Server error during bulk insert" });
  }
};

export default bulkCreateTheoryQuestions;
