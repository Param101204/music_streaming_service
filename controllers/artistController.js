import { getArtistsBySongId, getArtistImage } from "../models/artistModel.js";
import { getPlaylists } from "../models/playlistModel.js";
import { getSongsByArtist } from "../models/songModel.js";

export const artistController = async(req, res) => {
    if (!req.session.username) {
        return res.redirect('/login'); // Redirect to login if session data is missing
    }
    const artistName = req.params.name;
    try {
        const playlists = await getPlaylists(req.session.user_id); 

        const imageToSend = await getArtistImage(artistName);
        const map = new Map();
        const artistSongs = await getSongsByArtist(artistName);
        //(artistSongs);
        for ( var i = 0 ; i < artistSongs.length; i ++ ) {
            const curr = artistSongs[i]
            const curr_id = curr.song_id
            const artistsQuery = await getArtistsBySongId(curr_id);
            
            if(artistsQuery.length > 0) {
                const artists_ = []
                // const default_image = "https://img.freepik.com/free-vector/futuristic-gradient-profile-picture_742173-9236.jpg?t=st=1729619249~exp=1729622849~hmac=55667e6b0eeba43d3bf64403680e0b83acda9e20e4f86ec7b91d78cb56808cc4&w=740"
                
                for ( var k = 0 ; k < artistsQuery.length ; k ++ ) {
                   artists_.push(artistsQuery[k].song_artists)
                    // if (artistsQuery[k].artists_images != default_image) {
                    //     imageToSend = artistsQuery[k].artists_images;
                    // }
                }
                map.set(curr_id, {song_name : curr.track_name, album_name: curr.album_name, genre: curr.genre, spotify_code: curr.track_id, album_name: curr.album_name, duration: curr.duration, rating: curr.rating, artist: artists_})
            }    
        }
        res.render('artists.ejs', {data: map, len: map.size, username: req.session.username, image: imageToSend, artistName: artistName, playlists: playlists});
    }  catch(err) {
        console.error('Error with database query:', err);
        res.send('Internal Server Error');
    }
}