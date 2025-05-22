import { addUserPlaylist } from "../controllers/createPlaylistController.js";
import Router from 'express';

const router = Router();

// router.get('/add', addUserPlaylist);
router.post('/add', addUserPlaylist);

export default router;