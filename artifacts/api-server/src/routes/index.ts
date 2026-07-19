import { Router, type IRouter } from "express";
import healthRouter from "./health";
import geminiRouter from "./gemini/index";
import lawyersRouter from "./lawyers";
import documentsRouter from "./documents";
import articlesRouter from "./articles";
import casesRouter from "./cases";
import emergencyRouter from "./emergency";
import statsRouter from "./stats";

const router: IRouter = Router();

router.use(healthRouter);
router.use(geminiRouter);
router.use(lawyersRouter);
router.use(documentsRouter);
router.use(articlesRouter);
router.use(casesRouter);
router.use(emergencyRouter);
router.use(statsRouter);

export default router;
