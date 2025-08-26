import { Router } from 'express';
import { signup } from '../controllers/signupController.js';
const router = Router();

// These are relative to the base path ("/signup")
router.get('/', (req, res) => {
    res.render('signup.ejs');
});

router.post('/', signup);


export default router;