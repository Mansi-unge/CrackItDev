import express from "express"
import authMiddleware from "../Middleware/authMiddleware.js";
import createCodingQuestion from "../controller/Coding/createCodingQuestion.js";
import getCodingProgress from "../controller/Coding/getCodingProgress.js";
import getCodingQuestionById from "../controller/Coding/getCodingQuestionById.js";
import getFilteredCodingQuestions from "../controller/Coding/getFilteredCodingQuestions.js";
import saveCodingProgress from "../controller/Coding/saveCodingProgress.js";
import getCodingQuestionCount from "../controller/Coding/getCodingQuestionCount.js";
import bulkCreateCodingQuestions from "../controller/Coding/bulkCreateCodingQuestions.js";

const router = express.Router();

router.post("/save", authMiddleware, saveCodingProgress);

router.get("/progress", authMiddleware, getCodingProgress);

router.get("/", getFilteredCodingQuestions);

router.get("/count", getCodingQuestionCount);

router.get("/:id", getCodingQuestionById);

router.post("/", createCodingQuestion);

router.post("/bulk-insert", bulkCreateCodingQuestions);


export default router
