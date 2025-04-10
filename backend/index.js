const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const MongoStore = require('connect-mongo');

const app = express();
dotenv.config(); // Load .env variables

// Load models, routes, and database
const User = require('./models/users');
const DbConnection = require('./database/db');
const listingRoutes = require('./routes/listingRouts');
const reviewRoutes = require('./routes/reviewRoute');
const userRoutes = require('./routes/userRoutes');

const PORT = process.env.PORT || 8080;
const DbUrl = process.env.DB_URL;

/* --------------------- MIDDLEWARE SETUP ---------------------- */

// ✅ Clean CORS setup using CLIENT_URL from .env
app.use(cors({
  origin: process.env.CLIENT_URL, // ✅ Use deployed frontend URL from env
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

// Parse incoming request data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Session store in MongoDB
const store = MongoStore.create({
  mongoUrl: DbUrl,
  crypto: {
    secret: process.env.SECRET_KEY,
  },
  touchAfter: 24 * 3600,
});

store.on('error', () => {
  console.log('Mongo session store error');
});

// Session config
const sessionOptions = {
  store,
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  },
};

app.use(session(sessionOptions));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

/* --------------------- ROUTES ---------------------- */
app.use('/api/v1', listingRoutes);
app.use('/api/v1', reviewRoutes);
app.use('/api/v1', userRoutes);

/* --------------------- ERROR HANDLER ---------------------- */
app.use((err, req, res, next) => {
  const { status = 500, message = 'Something went wrong!' } = err;
  res.status(status).json({ message });
});

/* --------------------- SERVER LISTEN ---------------------- */
app.listen(PORT, () => {
  DbConnection(); // Connect to MongoDB
  console.log(`✅ Server running on port ${PORT}`);
});
