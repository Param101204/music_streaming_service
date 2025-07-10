import db from './db.js'; // or wherever your Supabase client is

// Add song to playlist
export const addToPlaylist = async (req, res) => {
  try {
    const { song_id, playlists } = req.body;

    for (const playlist of playlists) {
      await db
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

    const { error } = await db
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
// import { supabase } from "../supabaseClient.js";

export const getSongsForPlaylist = async (playlist_id) => {
  const { data, error } = await db
    .from('playlist_songs')
    .select(`
      track_id,
      songs (
        song_name,
        album_name,
        genre,
        duration,
        spotify_code,
        image
      ),
      song_artists (
        artists (
          artist_name
        )
      )
    `)
    .eq('playlist_id', playlist_id);

  if (error) {
    console.error("Error fetching songs for playlist:", error.message);
    throw error;
  }

  // Format the data to flatten and group artists per track
  const songMap = new Map();

  data.forEach(entry => {
    const trackId = entry.track_id;
    const song = entry.songs;
    const artistName = entry.song_artists?.artists?.artist_name;

    if (!songMap.has(trackId)) {
      songMap.set(trackId, {
        track_id: trackId,
        song_name: song.song_name,
        album_name: song.album_name,
        genre: song.genre,
        duration: song.duration,
        spotify_code: song.spotify_code,
        image: song.image,
        artist: artistName ? [artistName] : [],
      });
    } else {
      if (artistName) songMap.get(trackId).artist.push(artistName);
    }
  });

  return Array.from(songMap.values());
}
