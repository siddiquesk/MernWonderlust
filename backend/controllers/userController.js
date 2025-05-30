const User = require('../models/users');
const passport = require('passport');

// =======================
// SIGNUP
// =======================
const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const newUser = new User({ email, username });
    const registeredUser = await User.register(newUser, password); // passport-local-mongoose handles password hashing
    res.status(200).json(registeredUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// =======================
// LOGIN
// =======================
const login = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return res.status(500).json({ message: 'Something went wrong', error: err.message });
    }

    if (!user) {
      return res.status(401).json({ message: info.message || 'Invalid credentials' });
    }

    req.logIn(user, (err) => {
      if (err) {
        return res.status(500).json({ message: 'Login failed', error: err.message });
      }

      res.status(200).json({ message: 'Login successful', user });
    });
  })(req, res, next);
};

// =======================
// LOGOUT
// =======================
const logout = (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ message: 'Logout failed' });
    }
    res.clearCookie('connect.sid'); // Session cookie
    res.status(200).json({ message: 'Logged out successfully' });
  });
};

module.exports = { signup, login, logout };



