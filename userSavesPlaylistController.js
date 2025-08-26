import {insertUserSavedPlaylists} from '../models/userPlaylistsModel.js';
import { getPlaylistById } from '../models/playlistModel.js';
import {updateFollowersCount} from '../models/playlistModel.js';
export const userSavesPlaylist = async (req, res) => {
    // console.log(req.params.endpoint.split('-'));

    const [userId, playlistId] = req.params.endpoint.split('-');
    // console.log(`User ID: ${userId}, Playlist ID: ${playlistId}`);
    try {
        await insertUserSavedPlaylists(userId, playlistId);
        const playlist = await getPlaylistById(playlistId);
        if (!playlist) {
            return res.status(404).json({ success: false, message: 'Playlist not found' });
        }
        const updatedFollowersCount = playlist.followers + 1;
        console.log(updatedFollowersCount);
        await updateFollowersCount(playlistId, updatedFollowersCount);
        res.status(200).json({ success: true, message: 'Playlist saved successfully' });
    } catch (err) {
        console.error('Error saving playlist:', err);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};