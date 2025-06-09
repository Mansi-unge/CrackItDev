import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import mcqRoutes from './routes/mcqRoutes.js';
import codingRoutes from './routes/codingRoutes.js';
import theoryRoutes from './routes/theoryRoutes.js';
import rapidFireRoutes from './routes/rapidFireRoutes.js';
import progressRoutes from './routes/progressRoutes.js';
import questionRoutes from './routes/questionRoutes.js';
import userRoutes from './routes/userRoutes.js';

dotenv.config();
const app = express();

connectDB(); // connects to question cluster

// middleware
app.use(cors());
app.use(express.json());

// routes
app.use('/api/mcq', mcqRoutes);
app.use('/api/coding', codingRoutes);
app.use('/api/theory', theoryRoutes);
app.use('/api/rapid', rapidFireRoutes);
app.use('/api/progress', progressRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 8000;
app.get("/", (req, res) => res.send("API is running"));

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
