import express from "express";
import authMiddleware from "../Middleware/authMiddleware.js";

import { register } from "../controller/User/registerUser.js";
import { login } from "../controller/User/loginUser.js";
import { getProfile } from "../controller/User/getProfile.js";
import { requestPasswordReset } from "../controller/User/requestPasswordReset.js";
import { resetPassword } from "../controller/User/resetPassword.js";
import { getLeaderboardRank } from "../controller/User/getLeaderboardRank.js";
import { getUserRecentActivity } from "../controller/User/getUserRecentActivity.js";
import getUserActivityByYear from "../controller/User/getUserActivityByYear.js";
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", authMiddleware, getProfile);
router.post("/request-reset", requestPasswordReset);
router.post("/reset-password", resetPassword);
router.get("/rank", authMiddleware, getLeaderboardRank);
router.get("/user/:id/recent-activity", getUserRecentActivity);
router.get("/activity", authMiddleware, getUserActivityByYear);


export default router;
