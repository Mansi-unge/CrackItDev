  import express from 'express';
  import { saveCodingProgress  } from '../controller/codingController.js';
  import authMiddleware from '../Middleware/authMiddleware.js';

  const router = express.Router();
  router.post('/save', authMiddleware, saveCodingProgress);

  export default router;
