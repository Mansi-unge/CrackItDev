import Question from "./Question.js";
import mongoose from "mongoose";

const CodingQuestionSchema = new mongoose.Schema({
  hints: [String],
  sampleInput: String,
  sampleOutput: String,
  codeTemplate: String,
  solution: String,
  testCases: [
    {
      input: String,
      output: String,  // Note key name changed to "output" to match frontend
    },
  ],
  tech: String,  // Add tech stack for badge logic
});

const CodingQuestion = Question.discriminator("Coding", CodingQuestionSchema);

export default CodingQuestion;
