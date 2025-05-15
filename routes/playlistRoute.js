import { renderPlaylist } from "../controllers/playlistController.js";
import Router from 'express';

export const router = Router();

router.get('/:name', renderPlaylist);
router.post('/:searchText', (req, res) => {
    const redirect = '/search/' + req.body.search; 
    return res.redirect(redirect);
});
export default router;