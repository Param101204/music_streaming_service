import {renderHome, searchHome} from '../controllers/homeController.js';
import Router from 'express';

const router = Router();

router.get('/', renderHome);
router.post('/', searchHome);

export default router;