// models/TheoryQuestion.js
import Question from "./Question.js";
import mongoose from "mongoose";

const TheoryQuestionSchema = new mongoose.Schema({
  answer: String,
  fullAnswer: String
});

const TheoryQuestion = Question.discriminator('Theory', TheoryQuestionSchema);
export default TheoryQuestion ;
