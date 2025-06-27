// routes/dsaRoutes.js
import express from "express";
import createDsaQuestion from "../controller/Dsa/createDsaQuestion.js";
import getDsaQuestionById from "../controller/Dsa/getDsaQuestionById.js";
import getDsaQuestions from "../controller/Dsa/getDsaQuestions.js";
import submitDsaSolution from "../controller/Dsa/submitDsaSolution.js";
import authMiddleware from "../Middleware/authMiddleware.js";
import getUserDsaSolution from "../controller/Dsa/getUserDsaSolution.js";
const router = express.Router();

router.post("/create", createDsaQuestion); // POST /api/dsa/create
router.get("/", getDsaQuestions);          // GET  /api/dsa?difficulty=Medium&topic=Array
router.get("/:id", getDsaQuestionById);    // GET  /api/dsa/:id
router.post("/submit-dsa-solution", authMiddleware, submitDsaSolution);
router.get("/user-solution/:id", authMiddleware, getUserDsaSolution);


export default router;
