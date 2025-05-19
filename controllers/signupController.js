import { findUserByEmail, createUser, currentUser, insertPhones } from '../models/userModel.js';

    export const signup = async(req, res) => {
        const { email, password, username, dob, phone } = req.body;
        const check = await findUserByEmail(email);
        if(check.length > 0) {
            return res.render('login_signup2.ejs', {message: "An account with the given email Already Exists! Try Logging in."})
        } else {
            await createUser(username, email, password, dob);
            const currUser = await currentUser();
            await insertPhones(currUser[0].user_id, phone);
            req.session.username = currUser[0].username;
            req.session.user_id = currUser[0].user_id;
        }
    }

