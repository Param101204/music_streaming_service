import express from "express";
import bodyParser from "body-parser";
import session from "express-session";
import passport from "passport";

import signupRoute from './routes/signupRoute.js';
import loginRoute from './routes/loginRoute.js';
import homeRoute from './routes/homeRoute.js';
import searchRoute from './routes/searchRoute.js';
import artistRoute from './routes/artistRoute.js';
import playlistRoute from './routes/playlistRoute.js';
import createUserPlaylistRoute from './routes/createUserPlaylistRoute.js';
import userInsertsSongs from './routes/userInsertsSongsRoute.js';
import userPlaylistRoute from './routes/userPlaylistRoute.js';
import userDeletesSongsRoute from './routes/userDeletesSongsRoute.js';
import searchByArtistRoute from './routes/searchByArtistRoute.js';
import searchByNameRoute from './routes/searchByNameRoute.js';
import searchByAlbumRoute from './routes/searchByAlbumRoute.js';
// import searchByGenreRoute from './routes/searchByGenreRoute.js';

const app = express();
const port = 3000;

// import db from './models/db.js';
// db.connect();
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
// session
app.use(session({secret: "SECRET",resave: false,saveUninitialized: true,cookie : {maxAge: 1000 * 60 * 60 * 24,},}));

app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {res.render('login_signup2.ejs')});
app.use("/signup", signupRoute);
app.use("/login", loginRoute);
app.use('/home', homeRoute);
app.use('/search', searchRoute);
app.use('/artists', artistRoute);
app.use('/playlists', playlistRoute);
app.use('/create', createUserPlaylistRoute);
app.use('/add-to-playlists', userInsertsSongs);
app.use('/user-playlists', userPlaylistRoute);
app.use('/deleteSong', userDeletesSongsRoute);
app.use('/search-by-artist', searchByArtistRoute);
app.use('/search-by-song', searchByNameRoute);
app.use('/search-by-album', searchByAlbumRoute);
// app.use('/search-by-genre', searchByGenreRoute);
app.listen(port, () => {console.log(`Server running on http://localhost:${port}`);});