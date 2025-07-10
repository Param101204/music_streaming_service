import db from './db.js';

export const getArtists = async (artist_name) => {
    const { data, error } = await db
        .from('artists')
        .select('*')
        .ilike('artist_name', `${artist_name}%`);

    if (error) throw error;
    return data;
};

export const getArtistsByID = async (id) => {
    const { data, error } = await db
        .from('artists')
        .select('song_artists, artists_images')
        .eq('song_id', id);

    if (error) throw error;
    return data;
};

// Same as getArtistsByID
export const getArtistsBySongId = async (id) => {
    const { data, error } = await db
        .from('artists')
        .select('song_artists, artists_images')
        .eq('song_id', id);

    if (error) throw error;
    return data;
};

export const getArtistImage = async (artist_name) => {
    const { data, error } = await db
        .from('artists')
        .select('artists_images')
        .ilike('song_artists', `%${artist_name}%`);

    if (error) throw error;
    return data;
};
