// models/TheoryQuestion.js
import mongoose from "mongoose";

const { Schema, model } = mongoose;

const TheoryQuestionSchema = new Schema({
  title: { type: String, required: true },
  type: { type: String, default: "Theory" },
  tech: { type: String, required: true },
  level: {
    type: String,
    enum: ["Beginner", "Intermediate", "Advanced"],
    required: true,
  },
  description: { type: String },
  topic: { type: String, required: true },
  company: [{ type: String }],
  isDailyChallenge: { type: Boolean, default: false },
  answer: { type: String, required: true },
  fullAnswer: { type: String }, // Optional detailed explanation
  createdAt: { type: Date, default: Date.now },
});

const TheoryQuestion = model("TheoryQuestion", TheoryQuestionSchema);
export default TheoryQuestion;
