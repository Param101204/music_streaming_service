import db from './db.js';

export const getSongs = async (song_name, album_name) => {
    const { data, error } = await db
        .from('songs')
        .select('track_id, track_name, album_name, duration, rating')
        .or(`track_name.ilike.${song_name}%,album_name.ilike.${album_name}%`);

    if (error) throw error;
    return data;
};

export const getSongsById = async (track_id) => {
    const { data, error } = await db
        .from('songs')
        .select('*')
        .eq('track_id', track_id);

    if (error) throw error;
    return data;
};

export const getSongsByArtist = async (artist) => {
    const { data: artistData, error: artistError } = await db
        .from('artists')
        .select('artist_id')
        .ilike('artist_name', `${artist}%`);

    if (artistError) throw artistError;
    const artistIds = artistData.map(row => row.artist_id);
    if (artistIds.length === 0) return [];

    const { data, error } = await db
        .from('song_artists')
        .select('track_id')
        .in('artist_id', artistIds);

    if (error) throw error;
    const trackIds = data.map(d => d.track_id);
    if (trackIds.length === 0) return [];

    const songs = await db
        .from('songs')
        .select('*')
        .in('track_id', trackIds);

    return songs.data;
};

export const getSongsByAlbum = async (album) => {
    const { data, error } = await db
        .from('songs')
        .select('*')
        .ilike('album_name', `${album}%`);

    if (error) throw error;
    return data;
};

export const getSongsByName = async (songName) => {
    const { data, error } = await db
        .from('songs')
        .select('*')
        .ilike('track_name', `${songName}%`);

    if (error) throw error;
    return data;
};
