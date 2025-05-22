// import express from "express";
// import { urlencoded } from "body-parser";
import { createUserPlaylist } from "../models/playlistModel.js";
// const app = express();
// app.use(urlencoded({ extended: true }));

// Handle playlist creation
export const addUserPlaylist = async (req, res) => {
    // console.log('Route hit')
  const { playlistName } = req.body;
//   const songs = req.body.songs; // Will be an array if multiple songs are selected
  const id = req.session.user_id;
  if (!playlistName) {
    return res.status(400).send("Playlist name is required.");
  }
  // console.log("ID: ", id);
  // console.log("Name: ", playlistName);
  try {
    // Insert playlist into the database
    const playlist = await createUserPlaylist(id, playlistName);

    // const playlistId = playlist.rows[0].id;

    // if (songs) {
    //   // Insert selected songs into the playlist
    //   for (const songId of Array.isArray(songs) ? songs : [songs]) {
    //     await db.query(
    //       "INSERT INTO playlist_songs (playlist_id, song_id) VALUES ($1, $2)",
    //       [playlistId, songId]
    //     );
    //   }
    // }

    return res.redirect("/home"); 
  } catch (error) {
    console.error("Error adding playlist:", error);
    res.status(500).send("Error creating playlist.");
  }
}
