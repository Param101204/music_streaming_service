import { insertPlaylists } from "../controllers/userPlaylistsController.js";
import Router from 'express';

const router = Router();

router.post('/', insertPlaylists);

export default router;