import MCQQuestion from "../../models/MCQQuestion.js";

const verifyMcqAnswer = async (req, res) => {
  const { questionId, selectedOption } = req.body;

  try {
    const question = await MCQQuestion.findById(questionId);
    if (!question) return res.status(404).json({ message: "MCQ not found" });

    const isCorrect = question.correctOption === selectedOption;
    res.json({
      isCorrect,
      correctOption: question.correctOption,
      fullAnswer: question.fullAnswer || "",
      answerExplanation: question.answerExplanation || "No explanation available.",
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export default verifyMcqAnswer
