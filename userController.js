import { getUserPlaylists } from "../models/userPlaylistsModel.js";
import { getUserSavedPlaylists } from "../models/userPlaylistsModel.js";
import { getPlaylistById } from "../models/playlistModel.js";
export const userProfileRender = async (req, res) => {
    if(!req.session.username) {
        return res.redirect('/login');
    }
    const playlists = await getUserPlaylists(req.session.user_id);
    const saved_playlists = await getUserSavedPlaylists(req.session.user_id);
    for (const savedPlaylist of saved_playlists) {
        const currPlaylist = await getPlaylistById(savedPlaylist.playlist_id);
        if (!currPlaylist) {
            continue;
        }
        savedPlaylist.playlist_name = currPlaylist.playlist_name;
        savedPlaylist.playlist_id = currPlaylist.playlist_id;
        savedPlaylist.creator_id = currPlaylist.creator_id;
        savedPlaylist.playlist_image = currPlaylist.playlist_image;
        savedPlaylist.count_of_songs = currPlaylist.count_of_songs;
        savedPlaylist.duration = currPlaylist.duration;
        savedPlaylist.rating = currPlaylist.playlist_rating;
        savedPlaylist.followers = currPlaylist.followers;
    }
    res.render('users.ejs', {
        username: req.session.username,
        user_id: req.session.user_id,
        playlists: playlists,
        saved_playlists: saved_playlists
    });
};
