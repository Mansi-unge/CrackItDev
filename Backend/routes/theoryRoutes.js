import express from 'express';
import { createTheoryQuestion } from '../controller/theoryController.js';

const router = express.Router();
router.post('/create', createTheoryQuestion);

export default router;
