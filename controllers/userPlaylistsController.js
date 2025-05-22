import { getUserPlaylists, insertUserPlaylists } from "../models/userPlaylistsModel.js";
import { insertSongsToPlaylist } from "../models/userPlaylistSongsModel.js";

export const insertPlaylists = async(req, res) => {
    if (!req.session.username) {
        return res.redirect('/login'); // Redirect to login if session data is missing
    }
    //(req.body);
    const songToAdd_id = req.body.song_id;
    const playlistsInfo = req.body.playlists;
    //('Inside the Route');
    //(songToAdd_id);
    //(playlistsInfo);
    try {
        for ( var i = 0 ; i < playlistsInfo.length ; i ++ ) {
            await insertSongsToPlaylist(playlistsInfo[i].playlist_id, playlistsInfo[i].playlist_name, songToAdd_id);
            // await insertUserPlaylists(req.session.user_id, playlistsInfo[i].playlist_id, playlistsInfo[i].playlist_name);
        }
    } catch (err) {
        console.error('Error with database query:', err);
        res.send('Internal Server Error');
    }
}