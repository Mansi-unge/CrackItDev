import MCQQuestion from "../../models/MCQQuestion.js";

const bulkCreateMcqQuestions = async (req, res) => {
  try {
    const questions = req.body;

    if (!Array.isArray(questions)) {
      return res.status(400).json({ error: "Input must be an array of MCQ questions" });
    }

    const inserted = await MCQQuestion.insertMany(questions);
    res.status(201).json({ message: "MCQ questions inserted successfully", insertedCount: inserted.length });
  } catch (error) {
    console.error("Bulk MCQ insert error:", error);
    res.status(500).json({ error: "Server error during bulk insert" });
  }
};

export default bulkCreateMcqQuestions;
