import { Router } from 'express';
import {Docs, Images} from "../controllers/Upload";
import multer from "multer";
import * as path from "node:path";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, `${process.env.MEDIA_FOLDER}/images`);
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
        cb(null, uniqueName);
    },
});
const storage2 = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, `${process.env.MEDIA_FOLDER}/docs`);
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
        cb(null, uniqueName);
    },
});
const router = Router();
const upload = multer({ storage });
const upload2 = multer({ storage: storage2 });

router.post('/images', upload.any(), Images);
router.post('/docs', upload2.any(), Docs);

export default router;