import { getSongsByName } from "../models/songModel.js";
import { getArtistsByTrackId } from "../models/artistModel.js";
import { getPlaylistsByCreator } from "../models/playlistModel.js";

export const renderSearchByName = async (req, res) => {
  if (!req.session.username) return res.redirect('/login');

  const name = req.params.name;
  const search = await getSongsByName(name);
  const playlists = await getPlaylistsByCreator(req.session.user_id);
  const data = new Map();

  for (const curr of search) {
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
    query: name
  });
};
