import db from './db.js';

export const getSongs = async (song_name, album_name) => {
    return await db.query('SELECT song_id, track_id, track_name, album_name, duration, rating, genre FROM songs WHERE LOWER(track_name) ILIKE LOWER($1) OR LOWER(album_name) ILIKE LOWER($2)', [song_name, album_name]);
}

export const getSongsById = async (id) => {
    return await db.query('SELECT * FROM songs WHERE song_id = ($1)', [id]);
}

export const getSongsByArtist = async(artist) => {
    return await db.query('SELECT * FROM songs WHERE song_id IN (SELECT song_id FROM artists WHERE LOWER(song_artists) ILIKE LOWER($1))', [artist]);
}

export const getSongsByAlbum = async(album) => {
    return await db.query('SELECT * FROM songs WHERE LOWER(album_name) ILIKE LOWER($1)', [album]);
}
