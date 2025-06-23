import Newsletter from "../../models/Newsletter.js";
import nodemailer from "nodemailer";
import dotenv from 'dotenv';
dotenv.config();



// Create transporter once (you can also move this to a separate file and import if you want later)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,  
    pass: process.env.EMAIL_PASS    
  }
});

const subscribeEmail = async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: "Email is required." });

  try {
    // Check if already subscribed
    const existing = await Newsletter.findOne({ email });
    if (existing) return res.json({ message: "You're already subscribed!" });

    // Save to DB
    await Newsletter.create({ email });

    // Send Welcome Email
    await transporter.sendMail({
      from: `"CodePrep Platform" <yourgmail@gmail.com>`,
      to: email,
      subject: "Thanks for subscribing!",
      text: "🎉Welcome to the CodePrep community! \n \n You're officially subscribed and ready to level up your interview game. 💪 We’ll keep you updated with fresh challenges, new badges, and insider tips — right in your inbox. \n \n Stay sharp. Stay prepared. 🚀 ",
    });

    res.json({ message: "Subscribed successfully!" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export default subscribeEmail;