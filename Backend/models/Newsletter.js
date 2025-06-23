import mongoose from 'mongoose';
import userDB from '../config/UserDB.js'; 

const newsletterSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  subscribedAt: { type: Date, default: Date.now }
});

const Newsletter = userDB.model('Newsletter', newsletterSchema);

export default Newsletter;
