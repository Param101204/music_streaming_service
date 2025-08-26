import Router from 'express';
import {searchByArtist} from '../controllers/searchByArtistController.js';

const router = Router();
router.get('/:name', searchByArtist);
router.post('/:searchText', (req, res) => {
    const redirect = '/search-by-artist/' + req.body.searchText; 
    return res.redirect(redirect);
});
export default router;
