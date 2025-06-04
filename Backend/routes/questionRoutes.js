import express from 'express';
import { getFilteredQuestions , createQuestion } from '../controller/questionController.js';

const router = express.Router();

// GET /api/questions => Fetch questions with optional filters
router.get('/', getFilteredQuestions);
router.post('/', createQuestion);

export default router;
