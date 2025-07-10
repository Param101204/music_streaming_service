import { supabase } from './db.js'; // or wherever your Supabase client is

// Add song to playlist
export const addToPlaylist = async (req, res) => {
  try {
    const { song_id, playlists } = req.body;

    for (const playlist of playlists) {
      await supabase
        .from('playlist_songs')
        .insert([
          {
            playlist_id: playlist.playlist_id,
            track_id: song_id,
          },
        ]);
    }

    res.status(200).json({ success: true, message: 'Song added to playlists successfully.' });
  } catch (error) {
    console.error('Error adding song to playlists:', error.message);
    res.status(500).json({ success: false, error: error.message });
  }
};

// Delete song from playlist
export const deleteFromPlaylist = async (req, res) => {
  try {
    const { songId, playlistID } = req.body;

    const { error } = await supabase
      .from('playlist_songs')
      .delete()
      .match({ playlist_id: playlistID, track_id: songId });

    if (error) throw error;

    res.json({ success: true, message: 'Song removed from playlist.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
};
