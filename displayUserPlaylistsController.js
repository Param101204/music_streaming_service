import { getUserPlaylists } from "../models/userPlaylistsModel.js";
export const displayUserPlaylists = async (req, res) => {
    try {
        const playlists = await getUserPlaylists(req.session.user_id);
        if (!playlists || playlists.length === 0) {
            return res.render('displayUserPlaylists.ejs', {
                message: "No playlists found for this user.",
                username: req.session.username
            });
        }
        res.render('displayUserPlaylists.ejs', {
            playlists,
            username: req.session.username
        });
    } catch(err) {
        console.error('Error fetching user playlists:', err);
        res.status(500).send('Internal Server Error. Please try again later.'); 
    }
}