import Router from 'express';
import {loginController} from '../controllers/loginController.js'
const router = Router();

router.get('/', (req, res) => {
    res.render('login.ejs')
})

router.post('/', loginController);

export default router;