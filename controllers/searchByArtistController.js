import { getArtists, getArtistsByID } from "../models/artistModel.js";
import { getSongs, getSongsById } from "../models/songModel.js";
import { getPlaylists } from "../models/playlistModel.js";
export const searchByArtist = async(req, res) => {
    if(!req.session.username) {
        return res.redirect('/login');
    }
    const data = new Map();
    const text = req.params.name;
    const artistQuery = await getArtists(text);
    const playlists = await getPlaylists(req.session.user_id);
    if(artistQuery.length === 0) {
        return res.render('search.ejs', {data: data, len: data.size, username: req.session.username, message: "No results found"});
    } else {
        for (var i = 0 ; i < artistQuery.length ; i ++) {
            const curr_id = artistQuery[i].song_id
            const songs = await getSongsById(curr_id);
            for ( var j = 0 ; j < songs.length; j ++ ) {
                const curr = songs[j]
                const id = curr.song_id
                const artistsQuery = await getArtistsByID(id);
                // console.log(artistsQuery)
                if(artistsQuery.length > 0) {
                    const artists_ = []
                    // const default_image = "https://img.freepik.com/free-vector/futuristic-gradient-profile-picture_742173-9236.jpg?t=st=1729619249~exp=1729622849~hmac=55667e6b0eeba43d3bf64403680e0b83acda9e20e4f86ec7b91d78cb56808cc4&w=740"
                    var imageToSend = artistsQuery[0].artists_images;
                    for ( var k = 0 ; k < artistsQuery.length ; k ++ ) {
                            artists_.push(artistsQuery[k].song_artists)
                    }
                    data.set(id, {song_name : curr.track_name, album_name: curr.album_name, genre: curr.genre, spotify_code: curr.track_id, album_name: curr.album_name, duration: curr.duration, rating: curr.rating, artist: artists_, image: imageToSend})
                  }
            }       
        } 
        res.render('search.ejs', {data: data, len: data.size, username: req.session.username, playlists: playlists, query: text});
    }
}