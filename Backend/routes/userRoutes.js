  import express from "express";
  import { register , login , getProfile , requestPasswordReset , resetPassword , getLeaderboardRank} from "../controller/userController.js";
  import authMiddleware from "../Middleware/authMiddleware.js";
  import { getUserRecentActivity } from "../controller/User/getUserRecentActivity.js";

  const router = express.Router();

  router.post("/register", register);
  router.post("/login", login);
  router.get("/me", authMiddleware, getProfile);
  router.post("/request-reset", requestPasswordReset);
  // userRoutes.js
  router.post('/reset-password', resetPassword);
  router.get("/rank", authMiddleware, getLeaderboardRank);
router.get("/user/:id/recent-activity", getUserRecentActivity);


  export default router;
