import mongoose from "mongoose";
import userDB from "../config/UserDB.js";

const { Schema } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },

  passwordHash: {
    type: String,
    required: true,
  },

  resetToken: String,
  resetTokenExpiry: Date,

  // ✅ MCQ Points (1 point per MCQ, regardless of correctness)
  points: {
    mcq: { type: Number, default: 0 },
  },

  // ✅ Rapid Fire Streak (streak breaks if a day is missed)
  streak: {
    current: { type: Number, default: 0 },
    max: { type: Number, default: 0 },
    lastCompletedDate: { type: Date, default: null },
  },

  // ✅ Badges for coding questions
  badges: {
    silver: [{ type: String }], // questionIds
    gold: [{ type: String }],   // techStacks
  },

  // ✅ Solved MCQ Questions
  solvedMcqQuestions: [
    {
      questionId: { type: String, required: true },
      isCorrect: { type: Boolean, required: true },
      selectedOption: { type: String, required: true },
      answeredAt: { type: Date, default: Date.now },
    },
  ],

  // ✅ Solved Coding Questions (includes daily challenges)
  solvedCodingQuestions: [
    {
      questionId: { type: String, required: true },
      submittedCode: { type: String },
      isCorrect: { type: Boolean, default: false },
      techStack: { type: String }, // for gold badge
      isDailyChallenge: { type: Boolean, default: false },
      answeredAt: { type: Date, default: Date.now },
    },
  ],

  // ✅ Solved Rapid Fire Questions
  solvedRapidFireQuestions: [
    {
      questionId: String,
      success: Boolean,
      answeredAt: { type: Date, default: Date.now },
    },
  ],

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// ✅ Auto-update `updatedAt` on save
userSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

const User = userDB.model("User", userSchema);

export default User;
