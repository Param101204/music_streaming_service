export const logoutUser = async (req, res) => {
    try {
        req.session.destroy(err => {
            if (err) {
                console.error('Error destroying session:', err);
                return res.status(500).send('Internal Server Error. Please try again later.');
            }
            res.clearCookie('connect.sid');
            res.redirect('/login');
            // res.status(200).send('Logout successful');
        });
    } catch(err) {
        console.error('Error during logout:', err);
        res.status(500).send('Internal Server Error. Please try again later.');
    }
}