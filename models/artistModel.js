import db from './db.js';

export const getArtists = async (artist_name) => {
    const { data, error } = await db
        .from('artists')
        .select('*')
        .ilike('artist_name', `${artist_name}%`);

    if (error) throw error;
    return data;
};

export const getArtistsByTrackId = async (track_id) => {
    const { data, error } = await db
        .from('song_artists')
        .select('artist_id')
        .eq('track_id', track_id);

    if (error) throw error;
    const artistIds = data.map(row => row.artist_id);
    if (artistIds.length === 0) return [];

    const { data: artistData, error: error2 } = await db
        .from('artists')
        .select('artist_name, artist_image')
        .in('artist_id', artistIds);

    if (error2) throw error2;
    return artistData;
};

export const getArtistImage = async (artist_name) => {
    const { data, error } = await db
        .from('artists')
        .select('artist_image')
        .ilike('artist_name', `%${artist_name}%`);

    if (error) throw error;
    return data;
};
