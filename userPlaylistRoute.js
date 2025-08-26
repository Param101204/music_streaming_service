import Router from 'express';
import { renderUserPlaylist } from '../controllers/userPlaylistController.js';

const router = Router();
router.get('/:name', renderUserPlaylist);
router.post('/:searchText', (req, res) => {
    const redirect = '/search/' + req.body.search; 
    return res.redirect(redirect);
});
export default router;
