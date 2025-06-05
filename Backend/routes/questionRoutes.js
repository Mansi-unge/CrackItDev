import express from 'express';
import { getFilteredQuestions , createQuestion , getQuestionById } from '../controller/questionController.js';

const router = express.Router();

// GET /api/questions => Fetch questions with optional filters
router.get('/', getFilteredQuestions);
router.get('/:id', getQuestionById); 
router.post('/', createQuestion);

export default router;
