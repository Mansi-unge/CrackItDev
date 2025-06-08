import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import questionRoutes from "./routes/questionRoutes.js";
import userRoutes from "./routes/userRoutes.js"
import progressRoutes from "./routes/progressRoutes.js";

dotenv.config();
const app = express();

connectDB(); // connects to question cluster

// middleware
app.use(cors());
app.use(express.json());

// routes
app.use("/api/questions", questionRoutes);
app.use("/api/users", userRoutes);
app.use("/api/progress", progressRoutes);

const PORT = process.env.PORT || 8000;
app.get("/", (req, res) => res.send("API is running"));

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
