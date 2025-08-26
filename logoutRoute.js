import Router from 'express';
import { logoutUser } from '../controllers/logoutController.js';

const router = Router();

router.get('/', logoutUser);

export default router;
