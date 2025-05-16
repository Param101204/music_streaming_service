// playlistSongService.js
import db from "./db.js";

export const insertSongsToPlaylist = async (playlist_id, playlist_name, song_id) => {
    const { data, error } = await db
        .from('playlist_songs')
        .insert([
            {
                playlist_id: playlist_id,
                playlist_name: playlist_name,
                song_id: song_id
            }
        ]);

    if (error) throw error;
    return data;
};

export const getUserPlaylist = async (user_id, playlist_name) => {
    const { data, error } = await db
        .from('user_playlists')
        .select('*')
        .eq('user_id', user_id)
        .eq('playlist_name', playlist_name);

    if (error) throw error;
    return data;
};

export const getSongsFromUserPlaylist = async (playlist_id, playlist_name) => {
    const { data, error } = await db
        .from('playlist_songs')
        .select('song_id')
        .eq('playlist_id', playlist_id)
        .eq('playlist_name', playlist_name);

    if (error) throw error;
    return data;
};

export const deleteSong = async (playlist_id, song_id) => {
    const { data, error } = await db
        .from('playlist_songs')
        .delete()
        .eq('playlist_id', playlist_id)
        .eq('song_id', song_id);

    if (error) throw error;
    return data;
};
