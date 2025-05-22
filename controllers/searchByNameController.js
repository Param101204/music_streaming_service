import { getSongsByName } from "../models/songModel.js";
import {getArtistsBySongId} from "../models/artistModel.js";
import { getPlaylists } from "../models/playlistModel.js";
export const renderSearchByName = async (req, res) => {
    if(!req.session.username) {
        return res.redirect('/login');
    }
    const map = new Map();
    const text = req.params.name;
    const search = await getSongsByName(text);
    const playlists = await getPlaylists(req.session.user_id);
    var imageToSend = "https://img.freepik.com/free-vector/futuristic-gradient-profile-picture_742173-9236.jpg"
    for ( var i = 0 ; i < search.length; i ++ ) {
        const curr = search[i]
        const id = curr.song_id
        const artistsQuery = await getArtistsBySongId(id);
        if(artistsQuery.length > 0) {
            const artists_ = []
            imageToSend = artistsQuery[0].artists_images;
            for ( var k = 0 ; k < artistsQuery.length ; k ++ ) {
                artists_.push(artistsQuery[k].song_artists)
            }
            map.set(id, {song_name : curr.track_name, album_name: curr.album_name, genre: curr.genre, spotify_code: curr.track_id, album_name: curr.album_name, duration: curr.duration, rating: curr.rating, artist: artists_, image: imageToSend})
        }
    }
    res.render('search.ejs', {data: map, len: map.size, username: req.session.username, playlists: playlists, query: text});
}