import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
const app = express();
const port = 3000;
const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "music_db",
  password: "admin",
  port: 5432
});
db.connect();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get('/signup', (req, res) => {
  res.render('signup.ejs');
});

// Signup Form Handling (POST request)
app.post('/signup', async (req, res) => {
  const { email, password, username, dob, phone } = req.body;

  // Add simple validation (example)
  // if (!email || !password || !username || !dob || !phone) {
  //     return res.render('signup.ejs', { message: 'Please fill in all fields.' });
  // }

  // Simulate storing the data or sending it to a database
  const check = await db.query("SELECT email_id FROM users WHERE email_id = ($1)", [email]);
  if(check.rows.length === 0) {
    return res.render('login_signup2.ejs', {message: "An account with the given email Already Exists! Try Logging in."})
  } else {
    await db.query("INSERT INTO users(username, email_id, password, DOB) VALUES ($1, $2, $3, $4)", [username, email, password, dob]);
    for (var i = 0 ; i < phone.length ; i ++ ) {
      const currUser = await db.query("SELECT user_id FROM users ORDER BY user_id DESC LIMIT 1");
      await db.query("INSERT INTO mobile_numbers(user_id, mobile_no) VALUES ($1, $2)", [currUser.rows[0], phone[i]]);
    }
  }
  // Redirect or respond with a success message
  res.render('login_signup2', { message: 'Signup successful! Welcome, ' + username });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});