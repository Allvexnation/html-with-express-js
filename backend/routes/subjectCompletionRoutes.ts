import {Router} from "express";
import {markSubjectComplete, getStudentCompletions, deleteSubjectCompletion} from "../controllers/subjectCompletionController";

const router = Router();

router.post("/", markSubjectComplete);
router.get("/student/:studentId", getStudentCompletions);
router.delete("/:studentId/:subjectId", deleteSubjectCompletion);

export default router;
