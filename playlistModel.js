import db from './db.js';

export async function getPlaylistByIdByName(userId, playlistName) {
  const { data, error } = await db
    .from('playlists')
    .select('*')
    .eq('creator_id', userId)
    .eq('playlist_name', playlistName)
    .limit(1)
    .single();

  if (error) {
    console.error('Error fetching playlist:', error.message);
    return [];
  }
  // as array
  return [data];
}

export const getPlaylistsByCreator = async (user_id) => {
    const { data, error } = await db
        .from('playlists')
        .select('*')
        .eq('creator_id', user_id);
    // console.log(data);
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
        .select();

    if (error) throw error;

    const playlist_id = data[0].playlist_id;

    const { error: error2 } = await db
        .from('user_playlists')
        .insert([
            { user_id: user_id, playlist_id: playlist_id, playlist_name: name }
        ]);

    if (error2) throw error2;

    return data;
};

export const getPlaylistByName = async(playlist_name) => {
    const { data, error } = await db
        .from('playlists')
        .select('*')
        .eq('playlist_name', playlist_name)
        .limit(1)
        .single();

    if (error) {
        console.error('Error fetching playlist:', error.message);
        return [];
    }

    return [data];
}

export const updateFollowersCount = async (playlist_id, increment) => {
    const { data, error } = await db
        .from('playlists')
        .update({ followers: increment })
        .eq('playlist_id', playlist_id)
        .select();
    // console.log(`Updated followers count for playlist ${playlist_id}:`, data);
    if (error) throw error;
    return data;
};