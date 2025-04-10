const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport=require('passport');
const LocalStrategy=require('passport-local');
const User=require('./models/users');

// Load environment variables
dotenv.config();

// Import database connection and routes
const DbConnection = require('./database/db');
const listingRoutes = require('./routes/listingRouts');
const reviewRoutes = require('./routes/reviewRoute');
const userRoutes=require("./routes/userRoutes");
// Set port from .env or default to 8080
const PORT = process.env.PORT || 8080;

/* --------------------- MIDDLEWARE SETUP ---------------------- */

// Enable CORS for frontend origin (must come early)
app.use(cors({
  origin: 'http://localhost:5173', // Frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true, // Allow cookies/headers
}));

// Parse JSON and URL-encoded data from requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Parse cookies
app.use(cookieParser());

// Session middleware (after cookieParser)
app.use(session({
  secret: 'my superman key',
  resave: false,
  saveUninitialized: true,
  cookie: { 
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000 // 1 week
  }
}));

//passport local strategy
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

/*
app.get("/demouser",async(req,res)=>{
  let fakeuser=new User({
    email:"aja@gmail.com",
    username:"lopa",
  })
 const registeruser=await  User.register(fakeuser,"hello");
 console.log(registeruser.hash);
 res.send(registeruser);
})
*/

/* --------------------- ROUTES ---------------------- */
app.use('/api/v1', listingRoutes);
app.use('/api/v1', reviewRoutes);
app.use('/api/v1', userRoutes);
/* --------------------- ERROR HANDLER ---------------------- */
app.use((err, req, res, next) => {
  const { status = 500, message = "Something went wrong!" } = err;
  res.status(status).json({ message });
});

/* --------------------- SERVER LISTEN ---------------------- */
app.listen(PORT, () => {
  DbConnection(); // Connect to MongoDB
  console.log(`✅ Server is running on port ${PORT}`);
});


