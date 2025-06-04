// models/Question.js
import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const QuestionSchema = new Schema({
  title: String,
  answer: String,
  type: { type: String, enum: ['theory', 'mcq'] },
  tech: String, // e.g., HTML, React, Python
  level: { type: String, enum: ['beginner', 'intermediate', 'advanced'] },
  topic: String,
  company: [String], // e.g., ["Google", "Amazon"]
  isDailyChallenge: Boolean,
  options: [String], // for MCQ
  correctAnswer: String,
  createdAt: { type: Date, default: Date.now },
});

const Question = model('Question', QuestionSchema);
export default Question;
