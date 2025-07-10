import db from './db.js';

export const getPlaylistsByCreator = async (user_id) => {
    const { data, error } = await db
        .from('playlists')
        .select('*')
        .eq('creator_id', user_id);

    if (error) throw error;
    return data;
};

export const getPlaylistById = async (playlist_id) => {
    const { data, error } = await db
        .from('playlists')
        .select('*')
        .eq('playlist_id', playlist_id)
        .single(); // Assuming 1 row expected

    if (error) throw error;
    return data;
};

export const createUserPlaylist = async (user_id, name) => {
    const { data, error } = await db
        .from('playlists')
        .insert([
            { creator_id: user_id, playlist_name: name }
        ])
        .select(); // So we get back inserted playlist_id

    if (error) throw error;

    const playlist_id = data[0].playlist_id;

    // Optional: Store in user_playlists only if needed for sharing
    const { error: error2 } = await db
        .from('user_playlists')
        .insert([
            { user_id: user_id, playlist_id: playlist_id }
        ]);

    if (error2) throw error2;

    return data;
};
