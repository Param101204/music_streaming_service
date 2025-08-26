import Router from 'express';
import { userSavesPlaylist } from '../controllers/userSavesPlaylistController.js';
const router = new Router();

router.post('/:endpoint', userSavesPlaylist);

export default router;