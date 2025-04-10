const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const MongoStore = require('connect-mongo');

const app = express();
dotenv.config();

// Load models, routes, and database
const User = require('./models/users');
const DbConnection = require('./database/db');
const listingRoutes = require('./routes/listingRouts');
const reviewRoutes = require('./routes/reviewRoute');
const userRoutes = require('./routes/userRoutes');

const PORT = process.env.PORT || 8080;
const DbUrl = process.env.DB_URL;

/* --------------------------------
   MIDDLEWARE SETUP
----------------------------------*/

// Enable CORS for frontend
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

// Body parser and cookie parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Session store using MongoDB
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

// Session options
const sessionOptions = {
  store,
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  },
};

// Initialize session and passport
app.use(session(sessionOptions));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

/* --------------------------------
   ROUTES
----------------------------------*/
app.use('/api/v1', listingRoutes);
app.use('/api/v1', reviewRoutes);
app.use('/api/v1', userRoutes);

/* --------------------------------
   GLOBAL ERROR HANDLER
----------------------------------*/
app.use((err, req, res, next) => {
  const { status = 500, message = 'Something went wrong!' } = err;
  res.status(status).json({ message });
});

/* --------------------------------
   START SERVER
----------------------------------*/
app.listen(PORT, () => {
  DbConnection(); // MongoDB connection
  console.log(`✅ Server running on port ${PORT}`);
});


