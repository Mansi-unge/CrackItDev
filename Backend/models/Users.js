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
  points: {
    mcq: { type: Number, default: 0 },
      coding: { type: Number, default: 0 },
  },
  badges: {
    bronze: { type: Boolean, default: false },
    silver: { type: Boolean, default: false },
    golden: { type: Boolean, default: false },
  },
  solvedMcqQuestions: [
    {
      questionId: { type: String, required: true },
      isCorrect: { type: Boolean, required: true },
      selectedOption: { type: String, required: true },
      explanation: { type: String, default: "No explanation available." },
      answeredAt: { type: Date, default: Date.now },
    },
  ],
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
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

userSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

const User = userDB.model("User", userSchema);

export default User;
