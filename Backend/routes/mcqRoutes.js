import express from "express" ;
const router = express.Router();

import createMcqQuestion from "../controller/mcq/createMcqQuestion.js";
import getMcqById from "../controller/mcq/getMcqById.js";
import getFilteredMcqQuestions from "../controller/mcq/getFilteredMcqQuestions.js";
import verifyMcqAnswer from "../controller/mcq/verifyMcqAnswer.js";
import saveMcqProgress from "../controller/mcq/saveMcqProgress.js";
import getMcqProgress from "../controller/mcq/getMcqProgress.js";
import bulkCreateMcqQuestions from "../controller/mcq/bulkCreateMcqQuestions.js";
import authMiddleware from "../Middleware/authMiddleware.js";
import getSolvedMcqQuestions from "../controller/mcq/getSolvedMcqQuestions.js";


router.post("/create", createMcqQuestion);
router.post("/bulk-create", bulkCreateMcqQuestions);
router.get("/id/:id", getMcqById);
router.get("/filter", getFilteredMcqQuestions);
router.post("/verify", verifyMcqAnswer);
router.post("/save-progress", authMiddleware, saveMcqProgress);
router.get("/progress", authMiddleware, getMcqProgress);
router.post("/solved", authMiddleware, getSolvedMcqQuestions);


export default router;