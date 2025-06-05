// models/Question.js
import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const QuestionSchema = new Schema({
  title: String,
  answer: String,
  fullAnswer: String, // You may want this for explanations.
  type: { type: String, enum: ['Theory', 'MCQ', 'Coding'], default: 'Theory' },
  tech: String,
  level: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'] },
  topic: String,
  company: [String],
  isDailyChallenge: { type: Boolean, default: false },

  // ADD THIS for MCQs
  options: [String],  

  // New fields for coding challenge:
  hints: [String],
  sampleInput: String,
  sampleOutput: String,
  codeTemplate: String,
  solution: String,
  testCases: [
    {
      input: String,
      output: String,
    },
  ],

  createdAt: { type: Date, default: Date.now },
});

const Question = model('Question', QuestionSchema);
export default Question
