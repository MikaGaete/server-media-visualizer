import {Router} from 'express';
import {Delete, EditName, Get, GetAll} from "../controllers/Image";

const router = Router();

router.get('/', GetAll);
router.get('/:take', GetAll);
router.get('/specific/:imageId', Get);
router.patch('/', EditName);
router.delete('/', Delete);

export default router;