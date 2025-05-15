import db from "./db.js";

export const getUserPlaylists = async (user_id) => {
    return await db.query('SELECT * FROM user_playlists WHERE user_id = $1', [user_id]);
}

export const insertUserPlaylists = async (user_id, playlist_id, playlist_name) => {
    return await db.query('INSERT INTO user_playlists(user_id, playlist_id, playlist_name) VALUES ($1, $2, $3)', [user_id, playlist_id, playlist_name]);
}