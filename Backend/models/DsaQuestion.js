import mongoose from "mongoose";
const { Schema } = mongoose;

const dsaQuestionSchema = new Schema({
  title: String,
  description: String,
  difficulty: { type: String, enum: ["Easy", "Medium", "Hard"] },
  topic: String,
  constraints: String,
  examples: [{ input: String, output: String }],
  testCases: [
    {
      input: String,
      expectedOutput: String,
      hidden: { type: Boolean, default: true },
    },
  ],
  supportedTechStacks: [{ type: String }],
  hints: [{ type: String }],
  functionName: { type: String, required: true }, // NEW
  createdAt: { type: Date, default: Date.now },
});


const DsaQuestion = mongoose.model("DsaQuestion", dsaQuestionSchema);
export default DsaQuestion;
