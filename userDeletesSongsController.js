import { deleteSong } from '../models/userPlaylistSongsModel.js';

export const deleteSongFromUserPlaylist = async (req, res) => {
  const [track_id, playlist_id] = req.params.id.split('-');
  try {
    await deleteSong(playlist_id, track_id);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
};
