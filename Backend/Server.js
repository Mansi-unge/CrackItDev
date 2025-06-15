import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import theoryRoutes from './routes/theoryRoutes.js';
import mcqRoutes from "./routes/mcqRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import codingRoutes from "./routes/codingRoutes.js"

dotenv.config();
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/mcq", mcqRoutes);
app.use("/api/coding", codingRoutes); 
app.use("/api/users", userRoutes);
app.use('/api/theory', theoryRoutes);

// Health check route
app.get("/", (req, res) => res.send("API is running"));

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});



// import codingRoutes from './routes/codingRoutes.js';
// import rapidFireRoutes from './routes/rapidFireRoutes.js';
// import questionRoutes from './routes/questionRoutes.js';
// app.use('/api/coding', codingRoutes);

// app.use('/api/rapid', rapidFireRoutes);
// app.use('/api/questions', questionRoutes);