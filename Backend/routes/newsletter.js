import express from 'express';
import subscribeEmail from '../controller/Newsletter/newsletterController.js';

const router = express.Router();

router.post('/subscribe', subscribeEmail);

export default router
