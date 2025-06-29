// models/CodingQuestion.js
import mongoose from "mongoose";

const { Schema, model } = mongoose;

const CodingQuestionSchema = new Schema({
  title: { type: String, required: true },
  type: { type: String, default: "Coding" },
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

  hints: [String],
  sampleInput: { type: String },
  sampleOutput: { type: String },
  codeTemplate: { type: String },
  solution: { type: String },
  testCases: [
    {
      input: { type: String },
      output: { type: String},
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

const CodingQuestion = model("CodingQuestion", CodingQuestionSchema);
export default CodingQuestion;
