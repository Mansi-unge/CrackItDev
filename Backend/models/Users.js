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
    dsa: { type: Number, default: 0 },
  },
  newsletterSubscribed: {
    type: Boolean,
    default: false,
  },
  badges: {
    bronze: { type: Number, default: 0 }, // Count of bronze
    silver: { type: Number, default: 0 }, // Count of silver
    golden: { type: Number, default: 0 }, // Count of golden
  },
  earnedBadgeTitles: { type: [String], default: [] },
  solvedMcqQuestions: [
    {
      questionId: { type: String, required: true },
      isCorrect: { type: Boolean, required: true },
      selectedOption: { type: String, required: true },
      explanation: { type: String, default: "No explanation available." },
      techstack: { type: String },
      topic: { type: String },
      answeredAt: { type: Date, default: Date.now },
    },
  ],
  solvedCodingQuestions: [
    {
      questionId: { type: String, required: true },
      submittedCode: { type: String },
      isCorrect: { type: Boolean, default: false },
      techStack: { type: String }, // for gold badge
      topic: { type: String },
      isDailyChallenge: { type: Boolean, default: false },
      answeredAt: { type: Date, default: Date.now },
    },
  ],
  solvedDsaQuestions: [
    {
      questionId: { type: String, required: true },
      submittedCode: { type: String },
      isCorrect: { type: Boolean, default: false },
      techStack: { type: String },
      topic: { type: String },
      difficulty: { type: String }, // e.g., Easy, Medium, Hard
      answeredAt: { type: Date, default: Date.now },
      awardedPoints: { type: Number }, // helpful for future tracking
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
