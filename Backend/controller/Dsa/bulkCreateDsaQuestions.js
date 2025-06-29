import DsaQuestion from "../../models/DsaQuestion.js";

const bulkCreateDsaQuestions = async (req, res) => {
  try {
    const questions = req.body;

    if (!Array.isArray(questions)) {
      return res.status(400).json({ error: "Input must be an array of DSA questions" });
    }

    const inserted = await DsaQuestion.insertMany(questions);
    res.status(201).json({
      message: "DSA questions inserted successfully",
      insertedCount: inserted.length,
    });
  } catch (error) {
    console.error("Bulk DSA insert error:", error);
    res.status(500).json({ error: "Server error during bulk insert" });
  }
};

export default bulkCreateDsaQuestions;
