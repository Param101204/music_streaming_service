import pg from "pg";
export const query = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "music_db",
  password: "admin",
  port: 5432
});

