// Import necessary modules
import express from 'express';
import ejs from 'ejs';
import expressEjsLayouts from 'express-ejs-layouts';
import path from 'path';
import userRouter from './controller/user/user.routes.js';
import { db } from './config/mongoose.js';
import session from 'express-session';
import passport from 'passport';
import passportLocal from './config/passport.local.strategy.js';
import googleStrategy from './config/passport.oauth.strategy.js';
import flash from 'connect-flash';
import flashMiddleware from './middleware/flash.middleware.js';
import MongoStore from 'connect-mongo';
import dotenv from 'dotenv';

// Create an Express application
const app = express();

dotenv.config(); // Load environment variables from .env file


// Middleware for parsing form data
app.use(express.urlencoded({ extended: true }));

// Middleware for EJS layouts
app.use(expressEjsLayouts);

// Middleware to serve static files from the 'public' directory
app.use(express.static('public'));

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Set the views directory
app.set('views', path.join('views'));

// Configure session handling
app.use(
  session({
    name: "user_authentication", 
    secret: "Asking@1",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 2 * 24 * 60 * 60 * 1000, // 2 days

    },
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI, // MongoDB connection URL
      collectionName: 'sessionData',
      mongooseConnection: db, // Mongoose connection object
    }),
  })
);

// Initialize and configure Passport
app.use(passport.initialize());
app.use(passport.session());

// Using the flash middleware
app.use(flash());
app.use(flashMiddleware);

// Use the userRouter for handling routes
app.use('/', userRouter);

// Start the server on port 8000
const PORT = process.env.PORT || 8000; 
app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
