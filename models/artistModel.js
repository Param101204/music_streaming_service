import db from './db.js';

export const getArtists = async (artist_name) => {
    return await db.query('SELECT * FROM artists WHERE LOWER(song_artists) ILIKE LOWER($1)', [artist_name]);
}

export const getArtistsByID = async (id) => {
    return await db.query('SELECT song_artists, artists_images FROM artists WHERE song_id = $1', [id]);
}

export const getArtistsBySongId = async(id) => {
    return await db.query('SELECT song_artists, artists_images FROM artists WHERE song_id = $1', [id]);
}

export const getArtistImage = async(artist_name) => {
    return await db.query('SELECT artists_images FROM artists WHERE LOWER(song_artists) ILIKE LOWER($1)', [artist_name]);
}