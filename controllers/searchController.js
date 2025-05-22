import { getArtists, getArtistsByID } from "../models/artistModel.js";
import { getSongs, getSongsById } from "../models/songModel.js";
import { getPlaylists } from "../models/playlistModel.js";
export const renderSearch = async(req, res) => {
    if (!req.session.username) {
        return res.redirect('/login'); // Redirect to login if session data is missing
    }
    res.render('search.ejs', {username: req.session.username});
}

export const search = async(req, res) => {
    if (!req.session.username) {
        return res.redirect('/login'); // Redirect to login if session data is missing
    }
    const text = req.params.searchText;
    const match = '%' + text + '%';
    const map = new Map();
    const default_image = "https://img.freepik.com/free-vector/futuristic-gradient-profile-picture_742173-9236.jpg";

    try {
        const playlists = await getPlaylists(req.session.user_id); 
        const search = await getSongs(match, match);
        const artists = await getArtists(match);
        // console.log(artists)
        // const artists = await db.query('SELECT * FROM artists WHERE song_id IN (SELECT song_id FROM songs WHERE LOWER(song_name) ILIKE LOWER($1) OR LOWER(song_name) ILIKE LOWER($2))', [match, match])
        if(search.length === 0 && artists.length === 0) {
            res.render('search.ejs', {data: map, len: map.size, query: text})
        } else if(artists.length === 0) { 
            for ( var i = 0 ; i < search.length; i ++ ) {
                const curr = search[i]
                const curr_id = curr.song_id
                const artistsQuery = await getArtistsByID(curr_id);
                
                if(artistsQuery.length > 0) {
                    const artists_ = []
                    // const default_image = "https://img.freepik.com/free-vector/futuristic-gradient-profile-picture_742173-9236.jpg?t=st=1729619249~exp=1729622849~hmac=55667e6b0eeba43d3bf64403680e0b83acda9e20e4f86ec7b91d78cb56808cc4&w=740"
                    var imageToSend = artistsQuery[0].artists_images;
                    for ( var k = 0 ; k < artistsQuery.length ; k ++ ) {
                        artists_.push(artistsQuery[k].song_artists)
                    }
                    map.set(curr_id, {song_name : curr.track_name, album_name: curr.album_name, genre: curr.genre, spotify_code: curr.track_id, album_name: curr.album_name, duration: curr.duration, rating: curr.rating, artist: artists_, image: imageToSend})
                }
            }
            res.render('search.ejs', {data: map, len: map.size, username: req.session.username, playlists: playlists, query: text});
            // res.redirect('/search');
        } else if(search.length === 0) {

            for (var i = 0 ; i < artists.length ; i ++) {
                const curr_id = artists[i].song_id
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
                        map.set(id, {song_name : curr.track_name, album_name: curr.album_name, genre: curr.genre, spotify_code: curr.track_id, album_name: curr.album_name, duration: curr.duration, rating: curr.rating, artist: artists_, image: imageToSend})
                    }
                }       
            }
            res.render('search.ejs', {data: map, len: map.size, username: req.session.username, playlists: playlists, query: text});
            // res.redirect('/search');
        } else {
            var imageToSend = default_image;
            for ( var i = 0 ; i < search.length; i ++ ) {
                const curr = search[i]
                const id = curr.song_id
                const artistsQuery = await getArtistsByID(id);
                // console.log(artistsQuery)
                if(artistsQuery.length > 0) {
                    const artists_ = []
                    
                    imageToSend = artistsQuery[0].artists_images;
                    for ( var k = 0 ; k < artistsQuery.length ; k ++ ) {
                        artists_.push(artistsQuery[k].song_artists)
                    }
                    map.set(id, {song_name : curr.track_name, album_name: curr.album_name, genre: curr.genre, spotify_code: curr.track_id, album_name: curr.album_name, duration: curr.duration, rating: curr.rating, artist: artists_, image: imageToSend})
                }
            }
            // console.log(artists)
            for (var i = 0 ; i < artists.length ; i ++) {
                const curr_id = artists[i].song_id
                const songs = await getSongsById(curr_id);  
                // console.log(songs)
                for ( var j = 0 ; j < songs.length; j ++ ) {
                    const curr = songs[j]
                    const id = curr.song_id
                    const artistsQuery = await getArtistsByID(id);
                    // console.log(artistsQuery)
                    if(artistsQuery.length > 0) {
                        const artists_ = []
                        // const default_image = "https://img.freepik.com/free-vector/futuristic-gradient-profile-picture_742173-9236.jpg?t=st=1729619249~exp=1729622849~hmac=55667e6b0eeba43d3bf64403680e0b83acda9e20e4f86ec7b91d78cb56808cc4&w=740"
                        imageToSend = artistsQuery[0].artists_images;
                        for ( var k = 0 ; k < artistsQuery.length ; k ++ ) {
                            artists_.push(artistsQuery[k].song_artists)
                        }
                        map.set(id, {song_name : curr.track_name, album_name: curr.album_name, genre: curr.genre, spotify_code: curr.track_id, album_name: curr.album_name, duration: curr.duration, rating: curr.rating, artist: artists_, image: imageToSend})
                    }
                }       
            }
            res.render('search.ejs', {data: map, len: map.size, username: req.session.username, playlists: playlists, query: text});
        }
        // res.redirect(`/search/${encodeURIComponent(text)}`);
    } catch (err) {
        console.error('Error with database query:', err);
        res.send('Internal Server Error');
    }
}
