import { getArtistsByTrackId } from "../models/artistModel.js";
import { getPlaylistsByCreator, getPlaylistById } from "../models/playlistModel.js";
import { getSongsForPlaylist } from "../models/playlistSongsModel.js";

export const renderPlaylist = async (req, res) => {
  if (!req.session.username) return res.redirect('/login');

  const playlistName = req.params.name;
  const playlists = await getPlaylistsByCreator(req.session.user_id);
  const playlist = (await getPlaylistByIdByName(req.session.user_id, playlistName))[0];
  
  if (!playlist) {
    return res.render('playlists.ejs', { data: new Map(), len: 0, username: req.session.username });
  }

  const songEntries = await getSongsForPlaylist(playlist.playlist_id);
  const map = new Map();

  for (const song of songEntries) {
    const artistsQuery = await getArtistsByTrackId(song.track_id);
    if (artistsQuery.length) {
      const artists_ = artistsQuery.map(a => a.artist_name);
      map.set(song.track_id, {
        song_name: song.track_name,
        album_name: song.album_name,
        duration: song.duration,
        rating: song.rating,
        spotify_code: song.track_id,
        artist: artists_,
      });
    }
  }

  res.render('playlists.ejs', {
    playlists,
    data: map,
    len: map.size,
    username: req.session.username,
    playlistName,
    creatorId: playlist.creator_id,
    playlistID: playlist.playlist_id
  });
};
