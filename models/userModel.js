// models/userModel.js

import db from './db.js';  // Assuming you have a db connection
// Export each function you want to use in other files
export const findUserByEmail = async (email) => {
  return await db.query("SELECT * FROM users WHERE email_id = $1", [email]);
};

export const createUser = async (username, email, password, dob) => {
  return await db.query("INSERT INTO users(username, email_id, password, dob) VALUES ($1, $2, $3, $4)", [username, email, password, dob]);
};

export const currentUser = async () => {
  return await db.query("SELECT * FROM users ORDER BY user_id DESC LIMIT 1");
};

export const insertPhones = async (userID, phones) => {
  for (let i = 0; i < phones.length; i++) {
    await db.query("INSERT INTO mobile_numbers(user_id, mobile_no) VALUES ($1, $2)", [userID, phones[i]]);
  }
};
