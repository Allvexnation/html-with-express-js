import {Router} from "express";
import {uploadImage} from "../controllers/uploadController";
import multer from 'multer';

const upload = multer({ storage: multer.memoryStorage() });

const router = Router();

router.post('/image', upload.single('file'), uploadImage);

export default router;
