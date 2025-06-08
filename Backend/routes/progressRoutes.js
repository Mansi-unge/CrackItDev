import express from "express";
import { saveMcqProgress , saveCodingProgress , saveRapidFireProgress , getUserProgress } from "../controller/progressController.js";
import authMiddleware from "../Middleware/authMiddleware.js";

const router = express.Router();

router.post("/mcq", authMiddleware, saveMcqProgress);
router.post("/coding", authMiddleware, saveCodingProgress);
router.post("/rapid", authMiddleware, saveRapidFireProgress);
router.get("/", authMiddleware, getUserProgress);

export default router;
