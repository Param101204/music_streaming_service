import { addUserPlaylist } from "../controllers/createPlaylistController.js";
import Router from 'express';

const router = Router();

router.post('/add', addUserPlaylist);

export default router;