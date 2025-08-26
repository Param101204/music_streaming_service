import { getSongs } from "../models/songModel.js";
import { getArtistsByTrackId, getArtists } from "../models/artistModel.js";
import { getPlaylistsByCreator } from "../models/playlistModel.js";

export const renderSearch = (req, res) => {
  if (!req.session.username) return res.redirect('/login');
  res.render('search.ejs', { username: req.session.username });
};

export const search = async (req, res) => {
  if (!req.session.username) return res.redirect('/login');

  const text = req.params.searchText;
  const playlists = await getPlaylistsByCreator(req.session.user_id);
  const songs = await getSongs(text, text);
  const artists = await getArtists(text);

  const data = new Map();
  for (const curr of songs) {
    const artistsQuery = await getArtistsByTrackId(curr.track_id);
    if (artistsQuery.length) {
      const artists_ = artistsQuery.map(a => a.artist_name);
      data.set(curr.track_id, {
        song_name: curr.track_name,
        album_name: curr.album_name,
        duration: curr.duration,
        rating: curr.rating,
        spotify_code: curr.track_id,
        artist: artists_,
      });
    }
  }

  res.render('search.ejs', {
    data,
    len: data.size,
    username: req.session.username,
    playlists,
    query: text
  });
};
