import { deleteSong } from '../models/userPlaylistSongsModel.js';

export const deleteSongFromUserPlaylist = async(req, res) => {
    const ids = req.params.id;
    const song_id = ids.split('-')[0];
    const playlist_id = ids.split('-')[1];
    try {
        console.log('controller');
        console.log(playlist_id, song_id);
        await deleteSong(playlist_id, song_id);
        // return res.redirect('/user-playlists/' + playlist_name);
    } catch ( err ) {
        console.log(err);
    }
    res.json({ success: true });
}