import { findUserByEmail } from '../models/userModel.js';

export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        const users = await findUserByEmail(email);  // Supabase returns data directly as array

        if (!users || users.length === 0) {
            return res.render('login_signup2.ejs', {
                message: "No Account exists linked to your Email. Consider Creating A New Account."
            });
        }

        const user = users[0];

        if (user.password === password) {
            req.session.username = user.username;
            req.session.user_id = user.user_id;
            return res.redirect('/home');
        } else {
            return res.render('login_signup2.ejs', { message: "Incorrect Password!" });
        }

    } catch (err) {
        console.error('Error with database query:', err);
        res.status(500).send('Internal Server Error');
    }
};
