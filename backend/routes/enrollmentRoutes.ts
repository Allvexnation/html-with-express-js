import {Router} from "express";
import {enrollStudent, getEnrollments, getEnrollmentsByStudent, updateEnrollment, deleteEnrollment} from "../controllers/enrollmentController";

const router = Router();

router.post("/", enrollStudent);
router.get("/", getEnrollments);
router.get("/student/:studentId", getEnrollmentsByStudent);
router.put("/:id", updateEnrollment);
router.delete("/:id", deleteEnrollment);

export default router;
