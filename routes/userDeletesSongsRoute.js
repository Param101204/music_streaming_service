import { deleteSongFromUserPlaylist } from "../controllers/userDeletesSongsController.js";
import Router from 'express';

const router = Router();

router.delete('/:id', deleteSongFromUserPlaylist);

export default router;