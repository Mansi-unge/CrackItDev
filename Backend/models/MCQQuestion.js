// models/MCQQuestion.js
import mongoose from "mongoose";

const { Schema, model } = mongoose;

const MCQQuestionSchema = new Schema({
  title: { type: String, required: true },
  type: { type: String, default: 'MCQ' }, // Optional if always MCQ
  tech: { type: String, required: true },
  level: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'], required: true },
  description: { type: String }, // Optional
  topic: { type: String, required: true },
  company: [{ type: String }], // Optional array
  isDailyChallenge: { type: Boolean, default: false },
  options: {
    type: [String],
    validate: [arrayLimit, '{PATH} must have exactly 4 options'],
    required: true
  },
  correctOption: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        return this.options.includes(value);
      },
      message: "Correct option must be one of the options"
    }
  },
  answerExplanation: { type: String },
  createdAt: { type: Date, default: Date.now }
});

// Ensure 4 options
function arrayLimit(val) {
  return val.length === 4;
}

const MCQQuestion = model('MCQQuestion', MCQQuestionSchema);
export default MCQQuestion;
