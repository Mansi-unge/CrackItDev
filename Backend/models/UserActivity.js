import mongoose from "mongoose";
import userDB from "../config/UserDB.js";

const { Schema } = mongoose;

const userActivitySchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  activityType: {
    type: String,
    enum: ["DSA", "Coding", "MCQ", "Quiz", "Login"],
    required: true,
  },
  count: {
    type: Number,
    default: 1,
  },
});

userActivitySchema.index({ userId: 1, date: 1, activityType: 1 }, { unique: true });

const UserActivity = userDB.model("UserActivity", userActivitySchema);

export default UserActivity;
