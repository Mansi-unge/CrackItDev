import express from 'express';
import createTheoryQuestion from '../controller/Theory/createTheoryQuestion.js';
import getFilteredTheoryQuestions from '../controller/Theory/getFilteredTheoryQuestions.js';

 
const router = express.Router();
router.post('/create', createTheoryQuestion);
router.get("/questions", getFilteredTheoryQuestions);

export default router;
