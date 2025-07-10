import { getUserPlaylists } from "../models/userPlaylistsModel.js";
import { getUserSavedPlaylists } from "../models/userPlaylistsModel.js";

const userProfileRender = async (req, res) => {
    if(!req.session.username) {
        return res.redirect('/login');
    }
    const playlists = await getUserPlaylists(req.session.user_id);
    const saved_playlists = await getUserSavedPlaylists(req.session.user_id);
    res.render('users.ejs', {
        username: req.session.username,
        user_id: req.session.user_id,
        playlists: playlists,
        saved_playlists: saved_playlists
    });
};

export default userProfileRender;