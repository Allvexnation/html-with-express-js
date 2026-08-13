import {Router} from "express";
import {adminLogin, getStudents, getStudentById} from "../controllers/adminController";

const router = Router();

router.post("/login", adminLogin);
router.get("/students", getStudents);
router.get("/students/:id", getStudentById);

export default router;
