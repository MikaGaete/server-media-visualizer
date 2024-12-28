import {Router} from 'express';
import User from './src/routes/User';

const router = Router();

router.use('/users', User);

export default router;