import db from "./db.js";

export const insertSongsToPlaylist = async(playlist_id, playlist_name, song_id) => {
    return await db.query('INSERT INTO playlist_songs(playlist_id, playlist_name, song_id) VALUES($1, $2, $3)', [playlist_id, playlist_name, song_id]);
}

export const getUserPlaylist = async(user_id, playlist_name) => {
    return await db.query('SELECT * FROM user_playlists WHERE user_id = $1 AND playlist_name = $2', [user_id, playlist_name]);
}

export const getSongsFromUserPlaylist = async(playlist_id, playlist_name) => {
    return await db.query('SELECT song_id FROM playlist_songs WHERE playlist_id = $1 AND playlist_name = $2', [playlist_id, playlist_name]);
}

export const deleteSong = async(playlist_id, song_id) => {
    return await db.query('DELETE FROM playlist_songs WHERE playlist_id = $1 AND song_id = $2', [playlist_id, song_id]);
}