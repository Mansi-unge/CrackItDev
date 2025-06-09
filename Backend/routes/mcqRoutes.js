import express from 'express';
import { saveMcqProgress ,verifyMcqAnswer } from '../controller/MCQController.js';
import authMiddleware from '../Middleware/authMiddleware.js';

const router = express.Router();
router.post('/save', authMiddleware, saveMcqProgress);
router.post('/verify', verifyMcqAnswer);

export default router;
