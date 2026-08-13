import {Router} from "express";
import multer from 'multer';

import {
    register,
    login,
    getUsers,
    updateProfile,
    checkEmailExists,
    checkUsernameExists,
} from "../controllers/authController";

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/register", register);
router.post("/login", login);
router.get("/users", getUsers);
router.put("/profile/:id", upload.single('profile_image'), updateProfile);
router.get("/check-email", checkEmailExists);
router.get("/check-username", checkUsernameExists);

export default router;