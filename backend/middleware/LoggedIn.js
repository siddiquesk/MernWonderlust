
// middleware/loggedIn.js
module.exports.isLoggedIn = async (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.status(401).json({ message: "You must be logged in" });
};
