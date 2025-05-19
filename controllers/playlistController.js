import { getArtistsByID } from "../models/artistModel.js";
import { getPlaylists, getPlaylistsByName } from "../models/playlistModel.js";
import { getSongsByAlbum } from "../models/songModel.js";

export const renderPlaylist = async(req, res) => {
    if (!req.session.username) {
        return res.redirect('/login'); // Redirect to login if session data is missing
    }
    const playlistName = req.params.name;
    const default_image = "https://img.freepik.com/free-vector/futuristic-gradient-profile-picture_742173-9236.jpg?t=st=1729619249~exp=1729622849~hmac=55667e6b0eeba43d3bf64403680e0b83acda9e20e4f86ec7b91d78cb56808cc4&w=740"
    try {
        const playlists = await getPlaylists(req.session.user_id); 
        // var playlistImage;
        const map = new Map();
        const playlist = await getPlaylistsByName(playlistName);
        if(playlist.length === 0) {
            res.render('playlists.ejs', {data: map, len: 0, username: req.session.username, playlistImage: default_image})
        } else {
            const songs = await getSongsByAlbum(playlistName);
            for ( var i = 0 ; i < songs.length; i ++ ) {
                const curr = songs[i]
                const curr_id = curr.song_id
                const artistsQuery = await getArtistsByID(curr_id);
                var imageToSend = default_image;
                if(artistsQuery.length > 0) {
                    const artists_ = []     
                    for ( var k = 0 ; k < artistsQuery.length ; k ++ ) {
                        artists_.push(artistsQuery[k].song_artists)
                        if (artistsQuery[k].artists_images != default_image) {
                            imageToSend = artistsQuery[k].artists_images;
                        }
                    }
                    map.set(curr_id, {song_name : curr.track_name, album_name: curr.album_name, genre: curr.genre, spotify_code: curr.track_id, album_name: curr.album_name, duration: curr.duration, rating: curr.rating, artist: artists_, image: imageToSend})
                }    
            }
            res.render('playlists.ejs', {playlists: playlists, data: map, len: map.size, userId:req.session.user_id, username: req.session.username, playlistImage: default_image, playlistName: playlistName, creatorId: playlist[0].creator_id, countOfSongs: playlist[0].count_of_songs, duration: playlist[0].duration});
        }
    } catch (err) {
        console.error('Error with database query:', err);
        res.send('Internal Server Error');
    }
}