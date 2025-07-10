// userPlaylistService.js
import db from "./db.js";

export const getUserPlaylists = async (user_id) => {
    const { data, error } = await db
        .from('user_playlists')
        .select('*')
        .eq('user_id', user_id);

    if (error) throw error;
    return data;
};

export const insertUserPlaylists = async (user_id, playlist_id, playlist_name) => {
    const { data, error } = await db
        .from('user_playlists')
        .insert([
            {
                user_id: user_id,
                playlist_id: playlist_id,
                playlist_name: playlist_name
            }
        ]);

    if (error) throw error;
    return data;
};

export const insertUserSavedPlaylists = async(user_id, playlist_id) => {
    const {data, error} = await db.from('user_saved_playlists').insert([
        {
            user_id: user_id,
            playlist_id: playlist_id
        }
    ]);
    if(error) throw error;
    return data;
}

export const getUserSavedPlaylists = async (user_id) => {   
    const {data, error} = await db.from('user_saved_playlists').select('*').eq('user_id', user_id);
    if (error) throw error;
    return data;
};