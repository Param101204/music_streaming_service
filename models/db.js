import pg from "pg";
 const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "music_db",
  password: "admin",
  port: 5432
});

export default db;

