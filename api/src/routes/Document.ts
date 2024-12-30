import {Router} from 'express';
import {Delete, EditName, Get, GetAll} from "../controllers/Document";

const router = Router();

router.get('/', GetAll);
router.get('/:take', GetAll);
router.get('/specific/:documentId', Get);
router.patch('/', EditName);
router.delete('/', Delete);

export default router;