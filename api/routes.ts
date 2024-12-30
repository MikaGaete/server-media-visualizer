import {Router} from 'express';
import User from './src/routes/User';
import Upload from './src/routes/Upload';
import Image from './src/routes/Image';
import Document from './src/routes/Document';

const router = Router();

router.use('/users', User);
router.use('/uploads', Upload);
router.use('/images', Image);
router.use('/docs', Document);

export default router;