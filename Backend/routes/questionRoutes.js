import express from 'express';
import { getFilteredQuestions , getQuestionById , createQuestion} from '../controller/commonController.js';

const router = express.Router();
router.get('/', getFilteredQuestions);
router.get('/:id', getQuestionById);
router.post('/', createQuestion);


export default router;
