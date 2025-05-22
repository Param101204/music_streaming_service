import { Router } from "express";
const router = Router();
import { renderSearchByAlbum } from "../controllers/searchByAlbumController.js";

router.get("/:name", renderSearchByAlbum);
router.post("/:searchText", (req, res) => {
    const redirect = "/search-by-album/" + req.body.searchText;
    return res.redirect(redirect);
});
export default router;