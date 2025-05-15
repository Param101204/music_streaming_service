import db from './db.js';

export const getPlaylists = async (creator_id) => {
    return await db.query('SELECT * FROM playlists WHERE creator_id = ($1)', [creator_id]);
}

export const getPlaylistsByName = async(name) => {
    return await db.query('SELECT * FROM playlists WHERE LOWER(playlist_name) ILIKE LOWER($1)', [name]);
}

export const createUserPlaylist = async(id, name) => {
    return await db.query('INSERT INTO playlists(creator_id, playlist_name) VALUES ($1, $2)', [id, name]);
}