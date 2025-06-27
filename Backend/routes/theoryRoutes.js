import express from 'express';
import createTheoryQuestion from '../controller/Theory/createTheoryQuestion.js';
import getFilteredTheoryQuestions from '../controller/Theory/getFilteredTheoryQuestions.js';
import bulkCreateTheoryQuestions from '../controller/Theory/bulkCreateTheoryQuestions.js';

 
const router = express.Router();
router.post('/create', createTheoryQuestion);
router.get("/questions", getFilteredTheoryQuestions);
router.post("/bulk-create", bulkCreateTheoryQuestions);

export default router;
