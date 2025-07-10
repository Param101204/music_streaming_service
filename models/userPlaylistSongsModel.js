// playlistSongService.js
import db from "./db.js";

// Insert song into playlist
export const insertSongsToPlaylist = async (playlist_id, track_id) => {
    const { data, error } = await db
        .from('playlist_songs')
        .insert([
            {
                playlist_id: playlist_id,
                track_id: track_id
            }
        ]);

    if (error) throw error;
    return data;
};

// Get all user playlists with given name
export const getUserPlaylist = async (user_id, playlist_name) => {
    const { data, error } = await db
        .from('user_playlists')
        .select('*')
        .eq('user_id', user_id)
        .eq('playlist_name', playlist_name);

    if (error) throw error;
    return data;
};

// Get all song track_ids in playlist
export const getSongsFromUserPlaylist = async (playlist_id) => {
    const { data, error } = await db
        .from('playlist_songs')
        .select('track_id')
        .eq('playlist_id', playlist_id);

    if (error) throw error;
    return data;
};

// Delete a song from playlist
export const deleteSong = async (playlist_id, track_id) => {
    const { data, error } = await db
        .from('playlist_songs')
        .delete()
        .eq('playlist_id', playlist_id)
        .eq('track_id', track_id);

    if (error) throw error;
    return data;
};
