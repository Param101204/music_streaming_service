import { getPlaylists } from "../models/playlistModel.js";

export const renderHome = async(req, res) => {
    if (!req.session.username) {
        return res.redirect('/login'); // Redirect to login if session data is missing
    }
    const userPlaylists = await getPlaylists(req.session.user_id);
    res.render('index.ejs', {username: req.session.username, playlists: userPlaylists})
}

export const searchHome = async(req, res) => {
    const text = req.body.search;
    const match = '%' + text + '%';
    const map = new Map();
    const default_image = "https://img.freepik.com/free-vector/futuristic-gradient-profile-picture_742173-9236.jpg?t=st=1729619249~exp=1729622849~hmac=55667e6b0eeba43d3bf64403680e0b83acda9e20e4f86ec7b91d78cb56808cc4&w=740"
    try {
        return res.redirect(`/search/${encodeURIComponent(text)}`);
    } catch(err) {
        console.error('Error with database query:', err);
        return res.send('Internal Server Error');
    }
}