import Router from 'express';
import { renderSearchByName } from '../controllers/searchByNameController.js';

const router = Router();

router.get('/:name', renderSearchByName);
router.post('/:searchText', (req, res) => {
    const redirect = '/search-by-name/' + req.body.searchText; 
    return res.redirect(redirect);
});
export default router;
