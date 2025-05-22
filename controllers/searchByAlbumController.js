import { getSongsByAlbum } from "../models/songModel.js"
import { getArtistsBySongId } from "../models/artistModel.js";
import { getPlaylists } from "../models/playlistModel.js";
export const renderSearchByAlbum = async (req, res) => {
    if(!req.session.username) {
        return res.redirect('/login');
    }
    const data = new Map();
    const text = req.params.name;
    const search = await getSongsByAlbum(text);
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
            data.set(id, {song_name : curr.track_name, album_name: curr.album_name, genre: curr.genre, spotify_code: curr.track_id, album_name: curr.album_name, duration: curr.duration, rating: curr.rating, artist: artists_, image: imageToSend})
        }
    }
    res.render('search.ejs', {data: data, len: data.size, username: req.session.username, playlists: playlists, query: text});
}