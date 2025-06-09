// models/Question.js
import mongoose from "mongoose";
const {Schema , model} = mongoose ; 

const BaseQuestionSchema = new Schema({
  title: { type: String, required: true },
  type: { type: String, enum: ['Theory', 'MCQ', 'Coding'], required: true },
  tech: String,
  level: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'] },
  description : String ,
  topic: String,
  company: [String],
  isDailyChallenge: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
}, { discriminatorKey: 'type', collection: 'questions' });

const Question = model('Question', BaseQuestionSchema);
export default Question;
