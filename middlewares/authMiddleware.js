// middlewares/authMiddleware.js
const authMiddleware = (req, res, next) => {
    if (req.session && req.session.user_id) {
      next(); // User is authenticated, proceed to the next handler
    } else {
      res.redirect('/login');
    }
  };
  
  export default authMiddleware;
  