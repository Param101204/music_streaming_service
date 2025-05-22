// playlistService.js
import db from './db.js';

export const getPlaylists = async (creator_id) => {
    const { data, error } = await db
        .from('playlists')
        .select('*')
        .eq('creator_id', creator_id);

    if (error) throw error;
    return data;
};

export const getPlaylistsByName = async (name) => {
    const { data, error } = await db
        .from('playlists')
        .select('*')
        .ilike('playlist_name', `%${name}%`);

    if (error) throw error;
    return data;                                
};

export const createUserPlaylist = async (id, name) => {
    const { data, error } = await db
        .from('playlists')
        .insert([
            { creator_id: id, playlist_name: name }
        ]);
    if (error) throw error;
    // console.log(data)
    const {data1, error1 } = await db
        .from('user_playlists')
        .insert([
            { user_id: id, playlist_name: name}
        ]);
    if (error1) throw error1;
    return data;
};
