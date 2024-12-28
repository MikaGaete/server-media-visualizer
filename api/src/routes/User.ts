import { Router } from 'express';
import {Auth, Create, Hash, Token} from "../controllers/User";

const router = Router();

router.post('/', Hash, Create);
router.post('/auth', Token, Auth);

export default router;