import CodingQuestion from "../../models/CodingQuestion.js";

const bulkCreateCodingQuestions = async (req, res) => {
  try {
    const questions = req.body;

    if (!Array.isArray(questions)) {
      return res.status(400).json({ error: "Input must be an array of coding questions" });
    }

    const inserted = await CodingQuestion.insertMany(questions);
    res.status(201).json({
      message: "Coding questions inserted successfully",
      insertedCount: inserted.length,
    });
  } catch (error) {
    console.error("Bulk Coding insert error:", error);
    res.status(500).json({ error: "Server error during bulk insert" });
  }
};

export default bulkCreateCodingQuestions;
