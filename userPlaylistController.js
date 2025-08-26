import { getArtistsByTrackId } from "../models/artistModel.js";
import { getSongsById } from "../models/songModel.js";
import { getUserPlaylist } from "../models/userPlaylistSongsModel.js";
import { getSongsFromUserPlaylist } from "../models/userPlaylistSongsModel.js";

export const renderUserPlaylist = async (req, res) => {
  if (!req.session.username) return res.redirect('/login');

  const playlistName = req.params.name;
  const entries = await getUserPlaylist(req.session.user_id, playlistName);

  if (!entries.length) {
    return res.render('playlists.ejs', { data: new Map(), len: 0, username: req.session.username });
  }

  const trackIds = (await getSongsFromUserPlaylist(entries[0].playlist_id))
    .map(e => e.track_id);

  const map = new Map();
  for (const tid of trackIds) {
    const [song] = await getSongsById(tid);
    const artistsQuery = await getArtistsByTrackId(tid);
    if (artistsQuery.length) {
      const artists_ = artistsQuery.map(a => a.artist_name);
      map.set(tid, {
        song_name: song.track_name,
        album_name: song.album_name,
        duration: song.duration,
        rating: song.rating,
        spotify_code: song.track_id,
        artist: artists_,
      });
    }
  }

  res.render('userPlaylists.ejs', {
    playlists: entries,
    data: map,
    len: map.size,
    username: req.session.username,
    playlistName,
    playlistID: entries[0].playlist_id
  });
};
