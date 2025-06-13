  import express from 'express';
  import { saveCodingProgress , getCodingProgress  } from '../controller/codingController.js';
  import authMiddleware from '../Middleware/authMiddleware.js';

  const router = express.Router();
  router.post('/save', authMiddleware, saveCodingProgress);
  router.get("/progress", authMiddleware, getCodingProgress);

  export default router;
