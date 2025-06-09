// models/MCQQuestion.js
import Question from "./Question.js";
import mongoose from "mongoose";

const MCQQuestionSchema = new mongoose.Schema({
  options: [String],
  correctOption: String,
  answerExplanation: String
});

const MCQQuestion = Question.discriminator('MCQ', MCQQuestionSchema);
export default MCQQuestion