import { Router } from "express";
import { searchHome } from "../controllers/homeController.js";
import { userProfileRender } from "../controllers/userController.js";

const router = new Router();
router.get('/:username', userProfileRender);
router.post('/', searchHome);
export default router;