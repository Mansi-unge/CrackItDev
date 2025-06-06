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


  // ✅ Badges based on performance
  badges: {
    codingChampion: { type: Boolean, default: false },
    mcqMaster: { type: Boolean, default: false },
    rapidFireStreaker: { type: Boolean, default: false },
    goldCompleter: { type: Boolean, default: false },
  },

  // ✅ Points and Progress
  points: {
    mcq: { type: Number, default: 0 },
    coding: { type: Number, default: 0 },
    total: { type: Number, default: 0 },
  },

  // ✅ Streak and activity tracking
  streak: {
    current: { type: Number, default: 0 },
    max: { type: Number, default: 0 },
    lastCompletedDate: { type: Date, default: null }, // to avoid double-counting
  },

  // ✅ Question tracking
  solvedQuestions: [String], // General question IDs
  solvedCodingQuestions: [String],
  solvedMcqQuestions: [String],
  solvedRapidFireQuestions: [String],

  // ✅ Daily challenge history
  dailyChallengeHistory: [
    {
      date: Date,
      questionId: String,
      success: Boolean,
    },
  ],

  // ✅ Created/updated at
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Middleware to update `updatedAt` automatically
userSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

const User = userDB.model("User", userSchema);

export default User;
