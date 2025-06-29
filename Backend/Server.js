import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import theoryRoutes from './routes/theoryRoutes.js';
import mcqRoutes from "./routes/mcqRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import codingRoutes from "./routes/codingRoutes.js"
import newsletterRoutes from "./routes/newsletter.js"
import dsaRoutes from "./routes/dsaRoutes.js"

dotenv.config();
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({
  origin: "https://crack-it-dev.vercel.app", 
  credentials: true,
}));
app.use(express.json());

// Routes
app.use('/api/newsletter', newsletterRoutes);
app.use("/api/mcq", mcqRoutes);
app.use("/api/coding", codingRoutes); 
app.use("/api/users", userRoutes);
app.use('/api/theory', theoryRoutes);
app.use("/api/dsa", dsaRoutes);

// Health check route
app.get("/", (req, res) => res.send("API is running"));

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
