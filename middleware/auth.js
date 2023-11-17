// Authentication Middleware

import passport from "passport";

export const auth = (req, res, next) => {
    // Check if the user is authenticated
    if (req.isAuthenticated()) {
        // If authenticated, proceed to the next middleware or route handler
        next();
    } else {
        // If not authenticated, redirect to the home page 
        res.redirect('/');
    }
};
