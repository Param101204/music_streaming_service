import { getArtistsByTrackId, getArtistImage } from "../models/artistModel.js";
import { getPlaylistsByCreator } from "../models/playlistModel.js";
import { getSongsByArtist } from "../models/songModel.js";

export const artistController = async (req, res) => {
  if (!req.session.username) return res.redirect('/login');

  const artistName = req.params.name;
  try {
    const playlists = await getPlaylistsByCreator(req.session.user_id);
    const imageToSend = (await getArtistImage(artistName))[0]?.artist_image;

    const artistSongs = await getSongsByArtist(artistName);
    const map = new Map();

    for (const curr of artistSongs) {
      const currId = curr.track_id;
      const artistsQuery = await getArtistsByTrackId(currId);

      if (artistsQuery.length) {
        const artists_ = artistsQuery.map(a => a.artist_name);
        map.set(currId, {
          song_name: curr.track_name,
          album_name: curr.album_name,
          duration: curr.duration,
          rating: curr.rating,
          spotify_code: curr.track_id,
          artist: artists_,
        });
      }
    }

    res.render('artists.ejs', {
      data: map,
      len: map.size,
      username: req.session.username,
      image: imageToSend,
      artistName,
      playlists
    });
  } catch (err) {
    console.error('Error with database query:', err);
    res.sendStatus(500);
  }
};
// export default artistController;