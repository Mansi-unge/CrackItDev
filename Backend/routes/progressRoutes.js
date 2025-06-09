import express from 'express';
import { getUserProgress } from '../controller/commonController.js';
import authMiddleware from '../Middleware/authMiddleware.js';

const router = express.Router();
router.get('/', authMiddleware, getUserProgress);

export default router;
