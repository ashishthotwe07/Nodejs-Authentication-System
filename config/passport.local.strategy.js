import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { User } from '../model/user.model.js';
import bcrypt from 'bcrypt';

// Passport configuration for local strategy
passport.use(new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
  try {
    // Find the user by email
    const user = await User.findOne({ email: email });

    // If user not found, authentication fails
    if (!user) {
      return done(null, false);
    }

    // Compare the entered password with the hashed password in the database
    const result = await bcrypt.compare(password, user.password);

    // If passwords match, authentication is successful
    if (result) {
      return done(null, user);
    } else {
      // If passwords do not match, authentication fails
      
      return done(null, false, { message: 'Invalid email or password' });

    }
  } catch (err) {
    // If an error occurs, pass it to the callback
    return done(err);
  }
}));

// Serialize the user to store in the session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize the user from the session
passport.deserializeUser(async (id, done) => {
  try {
    // Find the user by ID in the database
    const user = await User.findById(id);

    // If user not found, deserialization fails
    if (!user) {
      return done(null, false);
    }

    // If user found, deserialization is successful
    return done(null, user);
  } catch (err) {
    // If an error occurs, pass it to the callback
    return done(err);
  }
});

// Middleware to set user information in locals if authenticated
passport.setUser = (req, res, next) => {
  if (req.isAuthenticated()) {
    req.locals.user = req.user;
    next();
  }
};

// Export the configured passport instance
export default passport;
