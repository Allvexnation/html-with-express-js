import {Router} from "express";
import {createGrade, getGrades, getGradesByStudent, getGradeById, updateGrade, deleteGrade} from "../controllers/gradeController";

const router = Router();

router.post("/", createGrade);
router.get("/", getGrades);
router.get("/student/:studentId", getGradesByStudent);
router.get("/:id", getGradeById);
router.put("/:id", updateGrade);
router.delete("/:id", deleteGrade);

export default router;
