import { insertUserPlaylists } from "../models/userPlaylistsModel.js";
import { insertSongsToPlaylist } from "../models/userPlaylistSongsModel.js";

export const insertPlaylists = async (req, res) => {
  if (!req.session.username) return res.redirect('/login');

  const trackId = req.body.song_id;
  const playlistsInfo = req.body.playlists;

  try {
    for (const pl of playlistsInfo) {
      await insertSongsToPlaylist(pl.playlist_id, trackId);
      await insertUserPlaylists(req.session.user_id, pl.playlist_id);
    }
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
};
