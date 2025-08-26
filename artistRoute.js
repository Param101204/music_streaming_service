import { artistController } from "../controllers/artistController.js";
import Router from 'express';

const router = Router();

router.get('/:name', artistController);
router.post('/:searchText', (req, res) => {
    const redirect = '/search/' + req.body.search; 
    return res.redirect(redirect);
});
export default router;
