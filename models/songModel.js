// songService.js
import db from './db.js';

export const getSongs = async (song_name, album_name) => {
    const { data, error } = await db
        .from('songs')
        .select('song_id, track_id, track_name, album_name, duration, rating, genre')
        .or(`track_name.ilike.%${song_name}%,album_name.ilike.%${album_name}%`);

    if (error) throw error;
    return data;
};

export const getSongsById = async (id) => {
    const { data, error } = await db
        .from('songs')
        .select('*')
        .eq('song_id', id);

    if (error) throw error;
    return data;
};

export const getSongsByArtist = async (artist) => {
    // First, get song_ids from artists table
    const { data: artistData, error: artistError } = await db
        .from('artists')
        .select('song_id')
        .ilike('song_artists', `${artist}`);

    if (artistError) throw artistError;
    // console.log(artistData);
    const songIds = artistData.map(row => row.song_id);
    // console.log(songIds);
    if (songIds.length === 0) return [];

    const { data, error } = await db
        .from('songs')
        .select('*')
        .in('song_id', songIds);

    if (error) throw error;
    // console.log(data)
    return data;
};

export const getSongsByAlbum = async (album) => {
    const { data, error } = await db.from('songs').select('*').ilike('album_name', `${album}`);
    if (error) throw error;
    // console.log(data)
    return data;
};

export const getSongsByName = async(songName) => {
    const { data, error } = await db
        .from('songs')
        .select('*')
        .ilike('track_name', `%${songName}%`);

    if (error) throw error;
    return data;
}
