import { search, renderSearch } from "../controllers/searchController.js";
import Router from 'express';
 
const router = Router();

router.get('/:searchText', search);
router.get('/', renderSearch);
router.post('/:searchText', (req, res) => {
    const redirect = '/search/' + req.body.search; 
    // console.log(redirect);
    return res.redirect(redirect);
});
export default router;