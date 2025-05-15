import {findUserByEmail} from '../models/userModel.js'

export const loginController = async(req, res) => {
    try {
        const {email, password} = req.body;
        const actualPassword = await findUserByEmail(email);
        if (actualPassword.rows.length === 0) {
            return res.render('login_signup2.ejs', {message: "No Account exists linked to your Email. Consider Creating A New Account."});
        } else {
            if(actualPassword.rows[0].password === password) {
                req.session.username = actualPassword.rows[0].username;
                req.session.user_id = actualPassword.rows[0].user_id;
                return res.redirect('/home')
            } else {
                return res.render('login_signup2.ejs', {message: "Incorrect Password!"})
            }
        }
    }
    catch (err) {
        console.error('Error with database query:', err);
        res.send('Internal Server Error');
    }
}