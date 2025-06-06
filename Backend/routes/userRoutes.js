import express from "express";
import { register , login , getProfile , requestPasswordReset , resetPassword } from "../controller/userController.js";
import authMiddleware from "../Middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", authMiddleware, getProfile);
router.post("/request-reset", requestPasswordReset);
// userRoutes.js
router.post('/reset-password', resetPassword);



export default router;
